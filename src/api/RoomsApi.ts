import { RoomType } from "src/types/types";
import { nanoid } from "nanoid";
import supabase from "src/config/supabaseClient";
import { getRoomImagePath } from "src/utils/helpers";
import { newRoomValues } from "src/validation/newRoomSchema";
import { itemsPerPage, supabaseUrl } from "src/utils/constants";

export const fetchAllRooms = async (
  filterValue: string,
  sortValue: string,
  page: number
): Promise<{ data: RoomType[]; count: number }> => {
  try {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("Rooms")
      .select("*", { count: "exact" })
      .range(from, to);

    if (filterValue === "With discount") {
      query = query.gt("discount", 0);
    } else if (filterValue === "No discount") {
      query = query.eq("discount", 0);
    }

    if (sortValue === "name (A-Z)") {
      query = query.order("name", { ascending: true });
    } else if (sortValue === "name (Z-A)") {
      query = query.order("name", { ascending: false });
    } else if (sortValue === "price (low first)") {
      query = query.order("regularPrice", { ascending: false });
    } else if (sortValue === "price (high first)") {
      query = query.order("regularPrice", { ascending: true });
    } else if (sortValue === "capacity (low first)") {
      query = query.order("capacity", { ascending: false });
    } else if (sortValue === "capacity (high first)") {
      query = query.order("capacity", { ascending: true });
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Error fetching data", error);
      return { data: [], count: 0 };
    }

    return { data: data || [], count: count ?? 0 };
  } catch (error) {
    console.error("Error fetching rooms", error);
    throw Error;
  }
};

export const deleteRoomFromServer = async (roomId: number) => {
  try {
    const { data: roomData, error: fetchError } = await supabase
      .from("Rooms")
      .select("image")
      .eq("id", roomId)
      .single();

    if (fetchError) {
      throw new Error("Error fetching room data");
    }

    const imageUrl = roomData?.image;
    const imagePath = getRoomImagePath(imageUrl);

    const { error: deleteImageError } = await supabase.storage
      .from("roomsStorage")
      .remove([imagePath]);

    if (deleteImageError) {
      throw new Error("Error deleting image from storage");
    }

    const { data, error: deleteRoomError } = await supabase
      .from("Rooms")
      .delete()
      .eq("id", roomId)
      .select()
      .single();

    if (deleteRoomError) {
      throw new Error("Error deleting room from database");
    }
    return data;
  } catch (error) {
    console.error("Error in deleteRoomFromServer function:", error);
    throw error;
  }
};

export const createNewRoom = async (newRoom: newRoomValues) => {
  const { data, error } = await supabase
    .from("Rooms")
    .insert([newRoom])
    .select()
    .single();
  if (error) {
    console.error("Error inserting row:", error);
    throw error;
  }
  return data;
};

// export const uploadImage = async (file: File, storage:string) => {
//   const fileName = `${nanoid()}_${file.name}`;

//   const { data, error } = await supabase.storage
//     .from(storage)
//     .upload(`${fileName}`, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   if (data) {
//     const { data: publicURL } = supabase.storage
//       .from(storage)
//       .getPublicUrl(`${fileName}`);

//     return publicURL.publicUrl;
//   } else {
//     console.error("Error uploading file: ", error.message);
//     return null;
//   }
// };

export const editRoomServer = async (roomId: number, newRoom: RoomType) => {
  try {
    const newRoomObj = newRoom.image[0] as File;
    const imageName = `${nanoid()}--${newRoomObj.name}`;
    const imagePath = `${supabaseUrl}/storage/v1/object/public/roomsStorage/${imageName}`;

    const updateRoomQuery = supabase
      .from("Rooms")
      .update({
        ...newRoom,
        image: imagePath,
      })
      .eq("id", roomId)
      .select()
      .single();

    const uploadImageQuery = supabase.storage
      .from("roomsStorage")
      .upload(imageName, newRoomObj, {
        cacheControl: "3600",
        upsert: false,
      });

    const [{ data, error: updateError }, { error: uploadError }] =
      await Promise.all([updateRoomQuery, uploadImageQuery]);

    if (updateError) {
      console.error("Error updating room:", updateError);
      return;
    }

    if (uploadError) {
      await supabase.from("Rooms").delete().eq("id", roomId);
      console.error("Error uploading image. Room update has been reverted.");
      return;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};


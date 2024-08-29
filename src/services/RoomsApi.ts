import { SupabaseClient } from "@supabase/supabase-js";
import { NewRoomType, RoomType } from "../types/types";
import { nanoid } from "nanoid";
import supabase from "../config/supabaseClient";

export const fetchAllRooms = async (
  supabase: SupabaseClient,
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("Rooms")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) {
      throw error || new Error("No data received");
    }

    setRooms(data);
  } catch (error) {
    setRooms([]);
    console.error("Error fetching rooms", error);
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

    const imagePath = roomData?.image;

    if (imagePath) {
      const { error: deleteImageError } = await supabase.storage
        .from("RoomHubBucket")
        .remove([imagePath]);

      if (deleteImageError) {
        throw new Error("Error deleting image from storage");
      }
    }

    const { data, error: deleteRoomError } = await supabase
      .from("Rooms")
      .delete()
      .eq("id", roomId)
      .select();

    if (deleteRoomError) {
      throw new Error("Error deleting room from database");
    }

    return data;
  } catch (error) {
    console.error("Error in deleteRoomFromServer function:", error);
    throw error;
  }
};

export const createNewRoom = async (newRoom: NewRoomType) => {
  const { data, error } = await supabase
    .from("Rooms")
    .insert([newRoom])
    .select();
  if (error) {
    console.error("Error inserting row:", error);
    throw error;
  }
  return data;
};

// export const uploadImage = async (obj) => {
//   const fileName = `${nanoid()}_${obj.name}`;
//   console.log(fileName)
//   return fileName
//   // const files = e.target.files;
//   // console.log(files);

//   // if (!files || files.length === 0) return null;

//   // const file = files[0];

// };

export const uploadImage = async (file) => {
  const fileName = `${nanoid()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("RoomHubBucket")
    .upload(`uploads/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (data) {
    const { data: publicURL } = supabase.storage
      .from("RoomHubBucket")
      .getPublicUrl(`uploads/${fileName}`);

    return publicURL.publicUrl;
  } else {
    console.error("Error uploading file: ", error.message);
    return null;
  }
};

// const addNewRoom = async (e) => {
//   try {
//     const data = await createNewRoom(singleRoom);
//     addRoom(data[0]);
//     showToast("Room created successfully!", "success");
//     setIsModalOpen(false);
//   } catch (error) {
//     console.error("Error creating new room:", error);
//     showToast("Unable to create new room. Please try again later.", "error");
//   }
// };

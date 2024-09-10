import { RoomType } from "src/types/types";
import { nanoid } from "nanoid";
import supabase from "src/config/supabaseClient";
import { getRoomImagePath } from "src/utils/helpers";
const supabaseUrl = "https://xonugvplyyycodzjotuu.supabase.co";

export const fetchAllRooms = async () => {
  try {
    const { data, error } = await supabase
      .from("Rooms")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data) {
      throw error || new Error("No data received");
    }
    return data;
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

export const createNewRoom = async (newRoom: RoomType) => {
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

export const uploadImage = async (file: File) => {
  const fileName = `${nanoid()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("roomsStorage")
    .upload(`${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (data) {
    const { data: publicURL } = supabase.storage
      .from("roomsStorage")
      .getPublicUrl(`${fileName}`);

    return publicURL.publicUrl;
  } else {
    console.error("Error uploading file: ", error.message);
    return null;
  }
};

export const editRoomServer = async (roomId: number, newRoom: RoomType) => {
  try {
    const newRoomName = newRoom.image[0] as File;
    const imageName = `${nanoid()}--${newRoomName.name}`;
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
      .upload(imageName, newRoomName, {
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

// date fns

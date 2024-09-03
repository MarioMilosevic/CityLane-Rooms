import { RoomType } from "../types/types";
import { nanoid } from "nanoid";
import supabase from "../config/supabaseClient";

export const fetchAllRooms = async (
) => {
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

    const imagePath = imageUrl.split(
      "/storage/v1/object/public/RoomHubBucket/"
    )[1];

    const { error: deleteImageError } = await supabase.storage
      .from("RoomHubBucket")
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

export const editRoomServer = async (roomId: number, updatedRoom: RoomType) => {
  try {
    const { data, error } = await supabase
      .from("Rooms")
      .update(updatedRoom)
      .eq("id", roomId)
      .select()
      .single();
    if (error) {
      console.log("Error updating room:", error);
      return error;
    }
    return data;
  } catch (error) {
    console.error("Error occured when trying to edit room", error);
  }
};

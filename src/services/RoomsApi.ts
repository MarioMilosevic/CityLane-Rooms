import { SupabaseClient } from "@supabase/supabase-js";
import { NewRoomType, RoomType } from "../types/types";
import { nanoid } from "nanoid";
import supabase from "../config/supabaseClient";

export const fetchAllRooms = async (
  supabase: SupabaseClient
): Promise<RoomType[]> => {
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

    if (imageUrl) {
      const imagePath = imageUrl.split(
        "/storage/v1/object/public/RoomHubBucket/"
      )[1];

      if (imagePath) {
        const { error: deleteImageError } = await supabase.storage
          .from("RoomHubBucket")
          .remove([imagePath]);

        if (deleteImageError) {
          throw new Error("Error deleting image from storage");
        }
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



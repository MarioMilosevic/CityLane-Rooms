import { SupabaseClient } from "@supabase/supabase-js";
import { Dispatch } from "@reduxjs/toolkit";
import { NewRoomType, RoomType } from "./types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import supabase from "../config/supabaseClient";

export const fetchAllRooms = async (
  supabase: SupabaseClient,
  dispatch: Dispatch,
  setRooms: ActionCreatorWithPayload<RoomType[], "rooms/setRooms">
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("Rooms")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) {
      throw error || new Error("No data received");
    }

    dispatch(setRooms(data));
  } catch (error) {
    dispatch(setRooms([]));
    console.error("Error fetching rooms", error);
  }
};

// export const deleteRoomFromServer = async (roomId: number) => {
//   try {
//     const { data, error } = await supabase
//       .from("Rooms")
//       .delete()
//       .eq("id", roomId)
//       .select();
//     if (error) {
//       throw new Error();
//     } else {
//       return data;
//     }
//   } catch (error) {
//     console.error("Error in deleteRoom function:", error);
//     throw error;
//   }
// };

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
        .remove([
          imagePath.replace(
            `${
              supabase.storage.from("RoomHubBucket").getPublicUrl("").data
                .publicUrl
            }`
          ),
        ]);

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

export const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;

  if (!files || files.length === 0) return null;

  const file = files[0];
  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("RoomHubBucket")
    .upload(`uploads/${fileName}`, file);

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

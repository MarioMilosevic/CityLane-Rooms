import { RoomType } from "../types/types";
import { nanoid } from "nanoid";
import supabase from "../config/supabaseClient";
import { getRoomImagePath } from "../utils/helpers";


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

    console.log('da testiram je li sve ok')
    // const imagePath = imageUrl.split(
    //   "/storage/v1/object/public/RoomHubBucket/"
    // )[1];

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
    .upload(`images/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
    console.log(data)
  
  if (data) {
    const { data: publicURL } = supabase.storage
      .from("RoomHubBucket")
      .getPublicUrl(`images/${fileName}`);

    return publicURL.publicUrl;
  } else {
    console.error("Error uploading file: ", error.message);
    return null;
  }
};

export const downloadImage = async (fileName: string) => {
  console.log(fileName);
  try {
    const imagePath = getRoomImagePath(fileName)
    console.log(imagePath)
   const { data, error } = await supabase.storage
     .from("RoomHubBucket")
     .download(imagePath);

      console.log("iz API", data)
      if (error) {
        return error;
      }
      return data
    } catch (error) {
      console.error('Error occured when getting image', error)
    }
};

export const replaceExistingFile = async (file) => {
  try {
    const { data, error } = await supabase.storage
      .from("RoomHubBucket")
      .update("images/avatar1.png", file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) {
      console.log(error)
      return
    }
    console.log(data)
  } catch (error) {
    console.log(error)
  }

}

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

// export const replaceImage = async () => {

// }

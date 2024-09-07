import { RoomType } from "../types/types";
import { nanoid } from "nanoid";
import supabase from "../config/supabaseClient";
import { getRoomImagePath } from "../utils/helpers";
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
  // console.log(newRoom);
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
    .upload(`${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  // console.log(data);

  if (data) {
    const { data: publicURL } = supabase.storage
      .from("RoomHubBucket")
      .getPublicUrl(`${fileName}`);

    return publicURL.publicUrl;
  } else {
    console.error("Error uploading file: ", error.message);
    return null;
  }
};

export const downloadImage = async (fileName: string) => {
  try {
    const imagePath = getRoomImagePath(fileName);
    const { data, error } = await supabase.storage
      .from("RoomHubBucket")
      .download(imagePath);

    if (error) {
      return error;
    }
    return data;
  } catch (error) {
    console.error("Error occured when getting image", error);
  }
};

export const replaceExistingFile = async (file) => {
  console.log(file.image.name);
  // console.log("NOVI FAJL IME",f);
  const imageName = `${crypto.randomUUID()}--${file.image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/RoomHubBucket/images/${imageName}`;
  try {
    let query = supabase.from("Rooms");
    const { data, error } = await supabase.storage
      .from("RoomHubBucket")
      .upload(`images/${oldFileName}`, newFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// https://xonugvplyyycodzjotuu.supabase.co/storage/v1/object/public/RoomHubBucket/images/58370695-7388-4296-9e3c-6b2846908f65--probnaslika.avif

// https://xonugvplyyycodzjotuu.supabase.co/storage/v1/object/public/RoomHubBucket/58370695-7388-4296-9e3c-6b2846908f65--probnaslika.avif

export const editRoomServer = async (roomId: number, newRoom: RoomType) => {
  console.log("OVO TRAZIMO", newRoom);
  const imageName = `${crypto.randomUUID()}--${newRoom.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/RoomHubBucket/${imageName}`;
  let query = supabase
    .from("Rooms")
    .update({
      ...newRoom,
      image: imagePath,
    })
    .eq("id", roomId);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
  const { data: storageData, error: storageError } = await supabase.storage
    .from("RoomHubBucket")
    .upload(imageName, newRoom.image, {
      cacheControl: "3600",
      upsert: false,
    });
  console.log(storageData);
  if (storageError) {
    await supabase.from("Rooms").delete("id", roomId);
    console.log("Soba nije mogla biti uploadovana, vracam promjene");
  }

  // try {

  //   const { capacity, description, discount, name, regularPrice } = newRoom
  //   console.log(capacity, description, discount, name, regularPrice)
  //   const { data, error } = await supabase
  //     .from("Rooms")
  //     .update({capacity, description, discount, name, regularPrice})
  //     .eq("id", roomId)
  //     .select()
  //     .single();
  //   if (error) {
  //     return error;
  //   }
  //   return data;
  // } catch (error) {
  //   console.error("Error occured when trying to edit room", error);
  // }
};

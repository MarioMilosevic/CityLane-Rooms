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

export const deleteRoomFromServer = async (roomId: number) => {
  console.log(roomId);
  try {
    const { data, error } = await supabase
      .from("Rooms")
      .delete()
      .eq("id", roomId)
      .select();
    if (error) {
      throw new Error();
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error in deleteRoom function:", error);
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

// export const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files[0];

//   if (!file) return;

//   const fileName = `${Date.now()}_${file.name}`;

//   const { data, error } = await supabase.storage
//     .from("RoomHubBucket")
//     .upload(`uploads/${fileName}`, file);

//   if (data) {
//     const { data: publicURL } = supabase.storage
//       .from("RoomHubBucket")
//       .getPublicUrl(`uploads/${fileName}`);
//     return publicURL;
//   } else {
//     console.error("Error uploading file: ", error.message);
//     return null;
//   }
// };


import React from "react";
import { supabase } from "./supabaseClient"; // Adjust the import path to where you have your Supabase client setup

export const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;

  // Check if files is null or empty
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

    return publicURL.publicUrl; // Access the publicUrl property
  } else {
    console.error("Error uploading file: ", error.message);
    return null;
  }
};

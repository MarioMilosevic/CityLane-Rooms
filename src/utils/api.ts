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

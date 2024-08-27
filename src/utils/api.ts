import { SupabaseClient } from "@supabase/supabase-js";
import { Dispatch } from "@reduxjs/toolkit";
import { RoomType } from "./types";
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
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const createRoom = async (newRoom:RoomType) => {
  try {
    const response = await supabase.from("Rooms").insert(newRoom).select();
    console.log(response)
  } catch (err) {
    console.error("Error when creating new room", err);
  }
};

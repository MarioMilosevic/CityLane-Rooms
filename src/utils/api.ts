import { SupabaseClient } from "@supabase/supabase-js";
import { Dispatch } from "@reduxjs/toolkit";
import { RoomType } from "./types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export const fetchRooms = async (
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

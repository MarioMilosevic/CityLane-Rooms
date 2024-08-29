import { useEffect } from "react";
import { fetchAllRooms } from "../services/RoomsApi";
import { RoomType } from "../types/types";
import supabase from "../config/supabaseClient";

const useFetchRooms = (
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>
) => {
  useEffect(() => {
    const fetchAndSetRooms = async () => {
      try {
        await fetchAllRooms(supabase, setRooms);
      } catch (error) {
        console.error("Error fetching rooms", error);
        setRooms([]);
      }
    };
    fetchAndSetRooms();
  }, [setRooms]);
};

export default useFetchRooms;

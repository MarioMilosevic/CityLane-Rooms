import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRooms } from "../redux/features/roomsSlice";
import { fetchRooms } from "../utils/api";
import supabase from "../config/supabaseClient";

const useFetchRooms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetRooms = async () => {
      try {
        await fetchRooms(supabase, dispatch, setRooms);
      } catch (error) {
        console.error("Error fetching rooms", error);
        dispatch(setRooms([]));
      }
    };

    fetchAndSetRooms();
  }, [dispatch]);
};

export default useFetchRooms;

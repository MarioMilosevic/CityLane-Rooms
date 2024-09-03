import { useEffect, useState } from "react";
import { fetchAllRooms } from "../services/RoomsApi";
import { RoomType } from "../types/types";

const useFetchRooms = (
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>,
  setRenderedRooms: React.Dispatch<React.SetStateAction<RoomType[]>>
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAndSetRooms = async () => {
      try {
        setLoading(true)
        const data = await fetchAllRooms();
        setRooms(data);
        setRenderedRooms(data);
      } catch (error) {
        console.error("Error fetching rooms", error);
        setRooms([]);
      } finally {
        setLoading(false)
      }
    };
    fetchAndSetRooms();
  }, [setRooms, setRenderedRooms]);
  return loading
};

export default useFetchRooms;

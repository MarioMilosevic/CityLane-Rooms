import { useEffect, useState } from "react";
import { fetchAllRooms } from "src/api/RoomsApi";
import { RoomType } from "src/types/types";

const useFetchRooms = (
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>,
  setRenderedRooms: React.Dispatch<React.SetStateAction<RoomType[]>>
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAndSetRooms = async () => {
      try {
        setLoading(true);
        const data = await fetchAllRooms();
        setRooms(data);
        setRenderedRooms(data);
      } catch (error) {
        console.error("Error fetching rooms", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetRooms();
  }, [setRooms, setRenderedRooms]);
  return loading;
};

export default useFetchRooms;

import { useEffect, useState } from "react";
import { fetchAllRooms } from "src/api/RoomsApi";
import { RoomType } from "src/types/types";

const useFetchRooms = (page:number) =>
  //   setData: React.Dispatch<React.SetStateAction<T>>,
  //   fetchData: () => Promise<T>
  {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState(false);
    const [numberOfRooms, setNumberOfRooms] = useState<number>(0)

    useEffect(() => {
      const fetchAndSetData = async () => {
        try {
          setLoading(true);
            const { data, count } = await fetchAllRooms(page);
            setRooms(data);
            setNumberOfRooms(count as number)
        } catch (error) {
          console.error("Error fetching rooms", error);
          setRooms([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAndSetData();
    }, [page]);
    return { rooms, loading, setRooms, numberOfRooms };
  };

export default useFetchRooms;

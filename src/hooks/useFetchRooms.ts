import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllRooms } from "src/api/RoomsApi";
import { RoomType } from "src/types/types";

const useFetchRooms = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfRooms, setNumberOfRooms] = useState<number>(0);
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "All";
  const sortValue = searchParams.get("sort") || "by name (A-Z)";
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchAndSetRooms = async () => {
      try {
        setLoading(true);
        const response = await fetchAllRooms(
          filterValue,
          sortValue,
          currentPage
        );

        if (response) {
          const { data, count } = response;
          setNumberOfRooms(count || 0);
          setRooms(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetRooms();
  }, [filterValue, sortValue, currentPage]);

  return { rooms, loading, numberOfRooms, currentPage, setRooms };
};

export default useFetchRooms;

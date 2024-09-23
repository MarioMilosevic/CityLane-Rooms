import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingType, RoomType } from "src/types/types";

type FetchFunction = (filter:string, sort:string, page:number) => Promise<{data:BookingType[] | RoomType[], count:number}> 

const useFetchData = (page: "bookings" | "rooms", fetchFunction: FetchFunction) => {
  const [data, setData] = useState<BookingType[] | RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [searchParams] = useSearchParams();

  let filterValue: string = "";
  let sortValue: string = "";

  if (page === "bookings") {
    filterValue = searchParams.get("status") || "All";
    sortValue = searchParams.get("sort") || "date (upcoming first)";
  } else if (page === "rooms") {
    filterValue = searchParams.get("discount") || "All";
    sortValue = searchParams.get("sort") || "name (A-Z)";
  }

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        setLoading(true);
        const response = await fetchFunction(
          filterValue,
          sortValue,
          currentPage
        );

        if (response) {
          const { data, count } = response;
          setNumberOfItems(count || 0);
          setData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetData();
  }, [filterValue, sortValue, currentPage, fetchFunction]);

  return { data, loading, numberOfItems, currentPage ,setData, setNumberOfItems };
};

export default useFetchData;

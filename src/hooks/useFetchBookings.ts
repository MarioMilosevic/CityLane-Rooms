import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBookings } from "src/api/BookingsApi";
import { BookingType } from "src/types/types";

const useFetchBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfBookings, setNumberOfBookings] = useState<number>(0);
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "All";
  const sortValue = searchParams.get("sort") || "date (upcoming first)";
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchAndSetBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchBookings(
          filterValue,
          sortValue,
          currentPage
        );

        if (response) {
          const { data, count } = response;
          setNumberOfBookings(count || 0);
          setBookings(data as BookingType[]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetBookings();
  }, [filterValue, sortValue, currentPage]);

  // Return the state values
  return { bookings, loading, numberOfBookings, currentPage };
};

export default useFetchBookings;

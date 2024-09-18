import { useEffect, useState } from "react";
import { fetchSingleBooking } from "src/api/BookingsApi";
import { BookingType } from "src/types/types";

const useFetchSingleBooking = (bookingId: string) => {
  const [singleBooking, setSingleBooking] = useState<BookingType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const result = await fetchSingleBooking(Number(bookingId));
        setSingleBooking(result);
      } catch (error) {
        console.error("Error occured", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);
  return { loading, singleBooking };
};

export default useFetchSingleBooking;

import { format, formatDistance, parseISO } from "date-fns";
import { BookingType } from "src/types/types";

const useBookingData = (singleBooking: BookingType, loading: boolean) => {
    if(loading) return

  const {
    numNights,
    roomId,
    created_at,
    endDate,
    startDate,
    extrasPrice,
    hasBreakfast,
    isPaid,
    numGuests,
    observations,
    roomPrice,
    status,
    totalPrice,
    id: fetchedBookingId,
    Guests: {
      id: guestId,
      countryFlag,
      email,
      fullName,
      nationalID,
    },
  } = singleBooking;

  const currentDate = new Date();
  const formattedStartDate = format(new Date(startDate), "MMM dd yyyy");
  const formattedEndDate = format(new Date(endDate), "MMM dd yyyy");
  const formattedCreatedDate = format(new Date(created_at), "MMM dd yyyy");
  const timeDifference = formatDistance(parseISO(startDate), currentDate);
  // diffenrence in days
  // subtract dates
  const createdDay = format(created_at, "EEEE").slice(0, 3);
  const startingDay = format(startDate, "EEEE").slice(0, 3);
  const endingDay = format(endDate, "EEEE").slice(0, 3);
  const isPaidClass = isPaid
    ? "bg-green-300 text-green-900"
    : "bg-yellow-200 text-yellow-900";

  return {
    numNights,
    roomId,
    startingDay,
    formattedStartDate,
    timeDifference,
    endingDay,
    formattedEndDate,
    countryFlag,
    fullName,
    numGuests,
    email,
    nationalID,
    observations,
    hasBreakfast,
    isPaidClass,
    totalPrice,
    roomPrice,
    extrasPrice,
    createdDay,
    formattedCreatedDate,
    isPaid,
    status,
    guestId,
    fetchedBookingId,
  };
};

export default useBookingData
import BookingHeader from "./BookingHeader";
import { useParams, useNavigate } from "react-router-dom";
import useFetchSingleBooking from "src/hooks/useFetchSingleBooking";
import LoadingSpinner from "./LoadingSpinner";
import BookingSection from "./BookingSection";
import useBookingData from "src/hooks/useBookingData";
import { BookingType } from "src/types/types";
const EditBooking = () => {
  const { bookingId } = useParams();
  console.log(bookingId);
  const navigate = useNavigate();
    const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);
    const bookingData = useBookingData(singleBooking as BookingType, loading)

  const goBack = () => {
    navigate("/bookings");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[50vh] flex flex-col">
      <BookingHeader
        status={bookingData?.status}
        bookingId={bookingId as string}
        goBack={goBack}
      />
     <BookingSection data={bookingData}/>
    </div>
  );
};

export default EditBooking;

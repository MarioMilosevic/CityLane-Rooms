import BookingHeader from "./BookingHeader";
import { useParams, useNavigate } from "react-router-dom";
import useFetchSingleBooking from "src/hooks/useFetchSingleBooking";
import LoadingSpinner from "./LoadingSpinner";
import BookingSection from "./BookingSection";
import useBookingData from "src/hooks/useBookingData";
import { BookingType } from "src/types/types";
import ButtonWrapper from "./ButtonWrapper";
import PrimaryActionButton from "../common/PrimaryActionButton";
const EditBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);
  const bookingData = useBookingData(singleBooking as BookingType, loading);
  console.log(bookingData);

  const goBack = () => {
    navigate("/bookings");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[50vh] flex flex-col gap-8">
      <BookingHeader
        status={bookingData?.status}
        bookingId={bookingId as string}
        goBack={goBack}
      />
      {bookingData && <BookingSection data={bookingData} />}
      <div className="flex items-center gap-4 p-4  bg-neutral-50">
        <input
          type="checkbox"
          className="w-5 h-5 accent-yellow-300 focus:ring-offset-1 focus:ring focus:ring-yellow-300"
        />
        <p>Want to add breakfast for $45.00?</p>
      </div>
      <div className="flex items-center gap-4 p-4  bg-neutral-50">
        <input
          type="checkbox"
          className="w-5 h-5 accent-yellow-300 focus:ring-offset-1 focus:ring focus:ring-yellow-300"
        />
        <p>
          I confirm that {bookingData?.fullName} has paid the total amount of{" "}
          {bookingData?.totalPrice}
        </p>
          </div>
          <ButtonWrapper justify="end">
              <PrimaryActionButton color="yellow" text={`Check in booking #${bookingId}`} />
              <PrimaryActionButton color="white" text="Back"/>
          </ButtonWrapper>
    </div>
  );
};

export default EditBooking;

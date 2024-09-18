import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteBooking } from "src/api/BookingsApi";
import { createPortal } from "react-dom";
import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import LoadingSpinner from "./LoadingSpinner";
import DeleteBookingModal from "./DeleteBookingModal";
import BookingHeader from "./BookingHeader";
import useFetchSingleBooking from "src/hooks/useFetchSingleBooking";
import BookingSection from "./BookingSection";
import useBookingData from "src/hooks/useBookingData";
import { BookingType } from "src/types/types";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const bookingData = useBookingData(singleBooking as BookingType, loading);

  if (loading) return <LoadingSpinner />;

  const goBack = () => {
    navigate("/bookings");
  };

  const deleteHandler = async () => {
    if (bookingData) {
      deleteBooking(bookingData.fetchedBookingId, bookingData.guestId);
      navigate("/bookings");
    }
  };

  return (
    <div className="min-h-[50vh] flex flex-col">
      <BookingHeader
        status={bookingData?.status}
        bookingId={bookingId as string}
        goBack={goBack}
      />
      {bookingData && <BookingSection data={bookingData} />}
      <ButtonWrapper justify="end">
        {bookingData?.status !== "Checked out" && (
          <PrimaryActionButton color="yellow" text="Check out" />
        )}
        <PrimaryActionButton
          color="red"
          text="Delete booking"
          clickHandler={() => setIsDeleteModalOpen(true)}
        />
        <PrimaryActionButton color="white" text="Back" clickHandler={goBack} />
      </ButtonWrapper>
      {isDeleteModalOpen &&
        createPortal(
          <DeleteBookingModal
            closeModal={() => setIsDeleteModalOpen(false)}
            deleteHandler={deleteHandler}
          />,
          document.body
        )}
    </div>
  );
};

export default BookingDetails;

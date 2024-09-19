import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteBooking } from "src/api/BookingsApi";
import { createPortal } from "react-dom";
import { BookingType } from "src/types/types";
import { showToast } from "src/utils/toast";
import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import LoadingSpinner from "./LoadingSpinner";
import BookingModal from "./BookingModal";
import BookingHeader from "./BookingHeader";
import useFetchSingleBooking from "src/hooks/useFetchSingleBooking";
import BookingSection from "./BookingSection";
import useBookingData from "src/hooks/useBookingData";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const bookingData = useBookingData(singleBooking as BookingType, loading);

  if (loading || !bookingData) return <LoadingSpinner />;

  const goBack = () => {
    navigate("/bookings");
  };

  const deleteHandler = async () => {
    if (bookingData) {
      deleteBooking(bookingData.fetchedBookingId, bookingData.guestId);
      navigate("/bookings");
      showToast("Booking deleted successfully", "success");
    }
  };

  const checkOut = () => {
    navigate(`/bookings/checkIn/${bookingId}`);
  };

  // const checkIn = () => {
  //   navigate(`/bookings/checkOut/${bookingId}`);
  // }

  return (
    <div className="min-h-[50vh] flex flex-col">
      <BookingHeader
        status={bookingData?.status}
        bookingId={bookingId as string}
        goBack={goBack}
      />
      <BookingSection data={bookingData} />
      <ButtonWrapper justify="end">
        {bookingData?.status !== "Checked out" && (
          <PrimaryActionButton
            color="yellow"
            text={
              bookingData.status === "Unconfirmed"
                ? "Check in"
                : bookingData?.status === "Checked in"
                ? "Check out"
                : ""
            }
            clickHandler={checkOut}
          />
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
          <BookingModal closeModal={() => setIsDeleteModalOpen(false)}>
            <ButtonWrapper justify="end">
              <PrimaryActionButton
                text="Cancel"
                color="white"
                clickHandler={() => setIsDeleteModalOpen(false)}
              />
              <PrimaryActionButton
                text="Delete"
                color="red"
                clickHandler={deleteHandler}
              />
            </ButtonWrapper>
          </BookingModal>,
          document.body
        )}
    </div>
  );
};

export default BookingDetails;

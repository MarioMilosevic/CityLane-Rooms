import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteBooking,
  checkOutBooking,
  fetchSingleBooking,
} from "src/api/BookingsApi";
import { createPortal } from "react-dom";
import { showToast } from "src/utils/toast";
import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import LoadingSpinner from "./LoadingSpinner";
import BookingModal from "./BookingModal";
import BookingHeader from "./BookingHeader";
import BookingSection from "./BookingSection";
import { BookingType } from "src/types/types";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [singleBooking, setSingleBooking] = useState<BookingType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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

  const navigate = useNavigate();

  if (loading || !singleBooking) return <LoadingSpinner />;


  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async () => {
    deleteBooking(singleBooking.id);
    goBack();
    showToast("Booking deleted successfully", "success");
  };

  const checkIn = () => {
    navigate(`/bookings/checkIn/${bookingId}`);
  };

  const checkOut = async () => {
    await checkOutBooking(Number(bookingId), "Checked out");
    setSingleBooking((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        status: "Checked out",
      };
    });
  };

  return (
    <div className="min-h-[50vh] flex flex-col">
      <BookingHeader
        status={singleBooking.status}
        title={`Booking #${bookingId}`}
        goBack={goBack}
      />
      <BookingSection booking={singleBooking as BookingType} />
      <ButtonWrapper justify="end">
        {singleBooking.status !== "Checked out" && (
          <PrimaryActionButton
            color="yellow"
            text={
              singleBooking.status === "Unconfirmed"
                ? "Check in"
                : singleBooking.status === "Checked in"
                ? "Check out"
                : ""
            }
            clickHandler={
              singleBooking.status === "Unconfirmed"
                ? checkIn
                : singleBooking.status === "Checked in"
                ? checkOut
                : undefined
            }
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
          <BookingModal
            title="Delete booking"
            closeModal={() => setIsDeleteModalOpen(false)}
          >
            <ButtonWrapper justify="end">
              <p>
                Are you sure you want to delete this booking permanently? <br />{" "}
                This action cannot be undone.
              </p>
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

// za check In kada kliknem check out da se rerenderuje i prikaze delete booking a gore check out
// da posaljem request kada izaberem dorucak i dobijem dorucak nazad
// da ono dugme bude sivo pa kada se strikira da postane zuto

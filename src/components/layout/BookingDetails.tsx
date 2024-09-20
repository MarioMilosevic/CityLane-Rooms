import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteBooking } from "src/api/BookingsApi";
import { createPortal } from "react-dom";
// import { BookingType } from "src/types/types";
import { showToast } from "src/utils/toast";
import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import LoadingSpinner from "./LoadingSpinner";
import BookingModal from "./BookingModal";
import BookingHeader from "./BookingHeader";
import useFetchSingleBooking from "src/hooks/useFetchSingleBooking";
import BookingSection from "./BookingSection";
import { BookingType } from "src/types/types";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

console.log(singleBooking)

  if (loading || !singleBooking) return <LoadingSpinner />;

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async () => {
      deleteBooking(singleBooking.id, singleBooking.guestId);
      goBack();
      showToast("Booking deleted successfully", "success");
  };

  const checkIn = () => {
    navigate(`/bookings/checkIn/${bookingId}`);
  };

  return (
    <div className="min-h-[50vh] flex flex-col">
      <BookingHeader
        status={singleBooking.status}
        title={`Booking #${bookingId}`}
        goBack={goBack}
      />
      <BookingSection data={singleBooking as BookingType} />
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
            clickHandler={checkIn}
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
          <BookingModal title="Delete booking" closeModal={() => setIsDeleteModalOpen(false)}>
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

// da promjenim one funkcije

// const currentDate = new Date();
// const formattedStartDate = format(new Date(startDate), "MMM dd yyyy");
// const formattedEndDate = format(new Date(endDate), "MMM dd yyyy");
// const formattedCreatedDate = format(new Date(created_at), "MMM dd yyyy");
// const timeDifference = formatDistance(parseISO(startDate), currentDate);
// const createdDay = format(created_at, "EEEE").slice(0, 3);
// const startingDay = format(startDate, "EEEE").slice(0, 3);
// const endingDay = format(endDate, "EEEE").slice(0, 3);
// const isPaidClass = isPaid
  // ? "bg-green-300 text-green-900"
// : "bg-yellow-200 text-yellow-900";
  
// za check In kada kliknem check out da se rerenderuje i prikaze delete booking a gore check out
// da posaljem request kada izaberem dorucak i dobijem dorucak nazad 
// da ono dugme bude sivo pa kada se strikira da postane zuto
import { useParams } from "react-router-dom";
import { PiHouseLineBold } from "react-icons/pi";
import { BiMessageDetail, BiArrowBack } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookingType } from "src/types/types";
import { deleteBooking, fetchSingleBooking } from "src/api/BookingsApi";
import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import Status from "./Status";
import Title from "../common/Title";
import LoadingSpinner from "./LoadingSpinner";
import Amount from "../common/Amount";
import { format, formatDistance, parseISO } from "date-fns";
import { initialSingleBookingState } from "src/utils/constants";
import DeleteBookingModal from "./DeleteBookingModal";
import { createPortal } from "react-dom";
import BookingHeader from "./BookingHeader";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [singleBooking, setSingleBooking] = useState<BookingType>(
    initialSingleBookingState
  );
  const navigate = useNavigate();
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

  if (loading) return <LoadingSpinner />;

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
      nationality,
    },
  } = singleBooking;

  const currentDate = new Date();
  const formattedStartDate = format(new Date(startDate), "MMM dd yyyy");
  const formattedEndDate = format(new Date(endDate), "MMM dd yyyy");
  const formattedCreatedDate = format(new Date(created_at), "MMM dd yyyy");
  const timeDifference = formatDistance(parseISO(startDate), currentDate);
  const createdDay = format(created_at, "EEEE").slice(0, 3);
  const startingDay = format(startDate, "EEEE").slice(0, 3);
  const endingDay = format(endDate, "EEEE").slice(0, 3);
  const isPaidClass = isPaid
    ? "bg-green-300 text-green-900"
    : "bg-yellow-200 text-yellow-900";

  const goBack = () => {
    navigate("/bookings");
  };

  const deleteHandler = async () => {
    deleteBooking(fetchedBookingId, guestId)
    navigate('/bookings')
  }

  return (
    <div className="min-h-[50vh] flex flex-col">
      <BookingHeader status={status} bookingId={bookingId} goBack={goBack} />
      <section className="bg-neutral-50">
        <header className="p-4 flex items-center justify-between bg-yellow-500 text-yellow-100 rounded-md">
          <div className="flex items-center gap-4">
            <PiHouseLineBold size={30} />
            <p>
              {numNights} nights in Room {roomId}{" "}
            </p>
          </div>
          <p>
            {startingDay}, {formattedStartDate} (
            {status === "Checked out" ? "Over" : "In"} {timeDifference}) —{" "}
            {endingDay}, {formattedEndDate}
          </p>
        </header>
        <section className="pt-8 pb-4 px-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img
              src={countryFlag}
              alt={countryFlag}
              className="w-[20px] h-[20px]"
            />
            <h2 className="font-medium">
              {fullName} + {numGuests - 1} guests
            </h2>
            <h3 className="font-light">• {email} •</h3>
            <h4 className="font-light">National ID {nationalID}</h4>
          </div>
          {observations && (
            <div className="flex items-center gap-2">
              <BiMessageDetail />
              <h2 className="font-medium">Observations</h2>
              <h3 className="font-light">{observations}</h3>
            </div>
          )}
          <div className="flex items-center gap-2 pb-6">
            <CiCircleCheck />
            <h2 className="font-medium">Breakfast included?</h2>
            <h3 className="font-light">{hasBreakfast ? "Yes" : "No"}</h3>
          </div>
          <div
            className={`flex justify-between items-center ${isPaidClass} p-4 rounded-md`}
          >
            <div className="flex items-center gap-2">
              <AiFillDollarCircle size={22} />
              <h3>Total price:</h3>
              <Amount value={totalPrice} type="amount" />
              {status === "Checked out" && (
                <>
                  (
                  <Amount value={roomPrice} type="amount" /> room +
                  <Amount value={extrasPrice} type="amount" /> breakfast)
                </>
              )}
            </div>
            <span className="font-medium uppercase">
              {isPaid ? "Paid" : "Will pay at property"}
            </span>
          </div>
        </section>
        <footer className="text-xs flex justify-end px-4 py-4 font-light">
          Booked {createdDay}, {formattedCreatedDate}
        </footer>
      </section>
      <ButtonWrapper justify="end">
        {status !== "Checked out" && (
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

import { useParams } from "react-router-dom";
import Status from "./Status";
import { PiHouseLineBold } from "react-icons/pi";
import { BiMessageDetail, BiArrowBack } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import { Link } from "react-router-dom";
import Title from "../common/Title";
import { useEffect, useState } from "react";
import { fetchSingleBooking } from "src/api/BookingsApi";
import { BookingType } from "src/types/types";
import LoadingSpinner from "./LoadingSpinner";
const BookingDetails = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [singleBooking, setSingleBooking] = useState<BookingType>({});
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // setLoading(true)
        const result = await fetchSingleBooking(Number(bookingId));
        console.log(result);
        setSingleBooking(result);
      } catch (error) {
        console.error("Error occured", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);


if(loading) return <LoadingSpinner/>

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
    Guests: {
      id: guestId,
      countryFlag,
      email,
      fullName,
      nationalID,
      nationality,
    },
  } = singleBooking;

  return (
    <div className="min-h-[50vh] flex flex-col">
      <div className="flex justify-between items-center py-8">
        <div className="flex gap-4">
          <Title title={`Booking #${bookingId}`} />
          <Status status="Checked in" />
        </div>
        <Link to={"/bookings"} className="flex items-center gap-2">
          <BiArrowBack size={22} />
          <span className="font-medium">Back</span>
        </Link>
      </div>
      <section className="bg-neutral-50">
        <header className="p-4 flex items-center justify-between bg-yellow-500 text-yellow-100 rounded-md">
          <div className="flex items-center gap-4">
            <PiHouseLineBold size={30} />
            <p>
              {numNights} nights in Room {roomId}{" "}
            </p>
          </div>
          <p>Mon, May 29 2023 (over 1 year ago) — Wed, May 31 2023</p>
        </header>
        <section className="pt-8 pb-4 px-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">
              {fullName} + {numGuests - 1} guests
            </h2>
            <h3 className="font-light">• {email} •</h3>
            <h4 className="font-light">National ID {nationalID}</h4>
          </div>
          <div className="flex items-center gap-2">
            <BiMessageDetail />
            <h2 className="font-medium">Observations</h2>
            <h3 className="font-light">{observations}</h3>
          </div>
          <div className="flex items-center gap-2 pb-6">
            <CiCircleCheck />
            <h2 className="font-medium">Breakfast included?</h2>
            <h3 className="font-light">{hasBreakfast ? "Yes" : "No"}</h3>
          </div>
          <div className="flex justify-between items-center bg-green-300 text-green-900 p-4 rounded-md">
            <div className="flex items-center gap-2">
              <AiFillDollarCircle size={22} />
              <h3>Total price</h3>
              <span>${totalPrice}</span>
            </div>
            <span className="font-medium uppercase">{isPaid ? "Paid" : "Will pay at property"}</span>
          </div>
        </section>
        <footer className="text-xs flex justify-end px-4 py-4 font-light">
          Booked Mon, May 29 2023, 12:46 PM
        </footer>
      </section>
      <ButtonWrapper justify="end">
        <PrimaryActionButton color="yellow" text="Check out" />
        <PrimaryActionButton color="red" text="Delete booking" />
        <PrimaryActionButton color="white" text="Back" />
      </ButtonWrapper>
    </div>
  );
};

export default BookingDetails;

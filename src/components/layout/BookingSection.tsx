import Amount from "../common/Amount";
import { BiMessageDetail } from "react-icons/bi";
import { PiHouseLineBold } from "react-icons/pi";
import { AiFillDollarCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { BookingSectionData } from "src/types/types";
import { formatDate, formatDay, timeDifference } from "src/utils/helpers";

const BookingSection = ({ booking }: BookingSectionData) => {
  const {
    Guests: { countryFlag, email, fullName, nationalID },
    created_at: booking_created_at,
    endDate,
    extrasPrice,
    isPaid,
    numGuests,
    numNights,
    observations,
    roomId,
    roomPrice,
    startDate,
    status,
    hasBreakfast,
    totalPrice,
  } = booking;

  const isPaidClass = isPaid
    ? "bg-green-300 text-green-900"
    : "bg-yellow-200 text-yellow-900";

  return (
    <section className="bg-neutral-50 dark:bg-slate-600">
      <header className="p-4 flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-0 gap-2 bg-yellow-500 text-yellow-100 rounded-md">
        <div className="flex items-center gap-4">
          <PiHouseLineBold className="lg:text-xl text-base" />
          <p className="text-base">
            {numNights} nights in Room {roomId}{" "}
          </p>
        </div>
        <p className="lg:text-base text-sm">
          {formatDay(startDate)}, {formatDate(startDate)} (
          {status === "Checked out" ? "Over" : "In"} {timeDifference(startDate)}
          ) — {formatDay(endDate)}, {formatDate(endDate)}
        </p>
      </header>

      <section className="pt-8 pb-4 px-4 flex flex-col gap-6">
        <div className="flex lg:flex-row flex-col lg:items-center lg:gap-2 gap-1">
          <img
            src={countryFlag}
            alt={countryFlag}
            className="w-5 h-5"
          />
          <h2 className="font-medium">
            {fullName} + {numGuests - 1} guests
          </h2>
          <h3 className="font-light lg:text-base text-sm">• {email} •</h3>
          <h4 className="font-light lg:text-base text-sm">National ID: {nationalID}</h4>
        </div>
        {observations && (
          <div className="flex items-center lg:gap-2">
            <BiMessageDetail className="lg:text-xl text-base"/>
            <h2 className="lg:text-lg text-base font-medium">Observations</h2>
            <h3 className="lg:text-base text-sm font-light">{observations}</h3>
          </div>
        )}
        <div className="flex items-center gap-2 pb-6">
          <CiCircleCheck className="lg:text-xl text-base"/>
          <h2 className="lg:text-lg text-base font-medium">Breakfast included?</h2>
          <h3 className="lg:text-base text-sm font-light">{hasBreakfast ? "Yes" : "No"}</h3>
        </div>
        <div
          className={`flex lg:flex-row lg:justify-between lg:items-center lg:gap-0 gap-2 flex-col ${isPaidClass} p-4 rounded-md`}
        >
          
          <div className="flex flex-row items-center lg:gap-2 gap-1 lg:text-base text-xs">
            <AiFillDollarCircle className="lg:text-xl text-base" />
            <h3>Total price:</h3>
            <Amount value={totalPrice} type="amount" position="start" />
            {status === "Checked out" && (
              <>
                (
                <Amount value={roomPrice} type="amount" position="start" /> 
                +
                <Amount
                  value={extrasPrice}
                  type="amount"
                  position="start"
                  />{" "}
                )
              </>
            )}
            </div>
          <span className="lg:text-base text-sm font-medium uppercase">
            {!isPaid ? "Paid" : "Will pay at property"}
          </span>
        </div>
      </section>

      <footer className="lg:text-sm text-xs flex justify-end px-4 py-4 font-light">
        Booked {formatDay(booking_created_at)}, {formatDate(booking_created_at)}
      </footer>
    </section>
  );
};

export default BookingSection;

import Amount from "../common/Amount";
import { BiMessageDetail } from "react-icons/bi";
import { PiHouseLineBold } from "react-icons/pi";
import { AiFillDollarCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { BookingSectionData } from "src/types/types";

const BookingSection = ({ data }:BookingSectionData) => {
  const {
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
  } = data

  return (
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
  );
};

export default BookingSection;

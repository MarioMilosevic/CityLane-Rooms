import Amount from "../common/Amount";
import OpenModalOptions from "./OpenModalOptions";
import Status from "./Status";
import OptionButton from "./OptionButton";
import Option from "../common/Option";
import { useState } from "react";
import useClickOutside from "src/hooks/useClickOutside";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { filterBookings } from "src/api/BookingsApi";


const SingleBooking = ({ numNights, roomId, roomPrice, startDate, endDate, status, totalPrice, Guests }) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
// console.log(status)

  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsOptionsModalOpen(false),
    isOptionsModalOpen
  );

  const {countryFlag, email, fullName, nationalID, nationality} = Guests

  return (
    <li className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center h-[60px] bg-neutral-50 relative">
      <p className="pl-4">{roomId}</p>
      <div className="flex flex-col gap-2">
        <h2>{ fullName}</h2>
        <h3 className="text-sm">{email}</h3>
      </div>
      <div className="flex flex-col">
        <span>In 5 years → 3 night stay</span>
        <span className="text-sm">Sep 18 2029 — Sep 21 2029</span>
      </div>
      <Status status={status} />
      <div className="flex justify-between pr-6">
        <Amount value={totalPrice} type="amount" />
        <OpenModalOptions clickHandler={() => setIsOptionsModalOpen(true)} />
      </div>
      <button onClick={() => filterBookings('checked-out')}>Cisto test</button>
      {isOptionsModalOpen && (
        <OptionButton ref={modalRef}>
          <Option
            text="Edit"
            icon={MdModeEditOutline}
            clickHandler={() => console.log("nesto")}
          />
          <Option
            text="Delete"
            icon={MdDelete}
            clickHandler={() => console.log("nesto")}
            // clickHandler={() => deleteHandler(room.id)}
          />
        </OptionButton>

      )}
    </li>
  );
};

export default SingleBooking;

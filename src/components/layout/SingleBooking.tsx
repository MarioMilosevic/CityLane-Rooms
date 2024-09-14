import Amount from "../common/Amount";
import OpenModalOptions from "./OpenModalOptions";
import Status from "./Status";
import OptionButton from "./OptionButton";
import Option from "../common/Option";
import useClickOutside from "src/hooks/useClickOutside";
import { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { format, formatDistance, parseISO,  } from "date-fns";

const SingleBooking = ({
  numNights,
  roomId,
  roomPrice,
  startDate,
  endDate,
  status,
  totalPrice,
  Guests,
}) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);

  
  console.log(startDate)
  const currentDate = new Date()
  console.log(currentDate)
  const formattedStartDate = format(new Date(startDate), "MMM dd yyyy");
  const formattedEndDate = format(new Date(endDate), "MMM dd yyyy");
  const timeDifference = formatDistance(parseISO(startDate), currentDate)
  console.log(timeDifference)

  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsOptionsModalOpen(false),
    isOptionsModalOpen
  );

  const { countryFlag, email, fullName, nationalID, nationality } = Guests;

  return (
    <li className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center py-1 bg-neutral-50 relative">
      <p className="pl-4">{roomId}</p>
      <div className="flex flex-col gap-2">
        <h2>{fullName}</h2>
        <h3 className="text-sm">{email}</h3>
      </div>
      <div className="flex flex-col">
        <span className="">In {timeDifference} → {numNights} night stay</span>
        <span className="text-sm">
          {formattedStartDate} — {formattedEndDate}
        </span>
        {/* <span>In 5 years → 3 night stay</span> */}
      </div>
      <Status status={status} />
      <div className="flex justify-between pr-6">
        <Amount value={totalPrice} type="amount" />
        <OpenModalOptions clickHandler={() => setIsOptionsModalOpen(true)} />
      </div>
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

import Amount from "../common/Amount";
import OpenModalOptions from "./OpenModalOptions";
import Status from "./Status";
import OptionButton from "./OptionButton";
import Option from "../common/Option";
import useClickOutside from "src/hooks/useClickOutside";
import DeleteBookingModal from "./DeleteBookingModal";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineRemoveRedEye,
  MdOutlineFileDownload,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { format, formatDistance, parseISO } from "date-fns";
import { SingleBookingProps } from "src/types/types";
import { deleteBooking } from "src/api/BookingsApi";


const SingleBooking = ({ booking, setBookings }: SingleBookingProps) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentDate = new Date();
  const {
    numNights,
    roomId,
    startDate,
    endDate,
    status,
    totalPrice,
    Guests: { email, fullName, id: guestId },
    id:bookingId
  } = booking;
  const formattedStartDate = format(new Date(startDate), "MMM dd yyyy");
  const formattedEndDate = format(new Date(endDate), "MMM dd yyyy");
  const timeDifference = formatDistance(parseISO(startDate), currentDate);
  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsOptionsModalOpen(false),
    isOptionsModalOpen
  );

  const seeDetails = () => {
    navigate(`/bookings/${bookingId}`);
  };

  const deleteHandler = async () => {
    await deleteBooking(bookingId, guestId);
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const updateHandler = () => {
    navigate(`/bookings/checkIn/${bookingId}`)
  }


  return (
    <li className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center py-1 bg-neutral-50 relative dark:bg-slate-500">
      <p className="pl-4">{roomId}</p>
      <div className="flex flex-col gap-2">
        <h2>{fullName}</h2>
        <h3 className="text-sm">{email}</h3>
      </div>
      <div className="flex flex-col">
        <span className="">
          {status === "Checked out" ? "Over" : "In"} {timeDifference} → {""}
          {numNights} night stay
        </span>
        <span className="text-sm">
          {formattedStartDate} — {formattedEndDate}
        </span>
      </div>
      <Status status={status} />
      <div className="flex justify-between pr-6">
        <Amount value={totalPrice} type="amount" />
        <OpenModalOptions clickHandler={() => setIsOptionsModalOpen(true)} />
      </div>
      {isOptionsModalOpen && (
        <OptionButton ref={modalRef}>
          <Option
            text="See details"
            icon={MdOutlineRemoveRedEye}
            clickHandler={seeDetails}
          />
          {status !== "Checked out" && (
            <Option
              text={
                status === "Unconfirmed"
                  ? "Check in"
                  : status === "Checked in"
                  ? "Check out"
                  : ""
              }
              icon={MdOutlineFileDownload}
              clickHandler={updateHandler}
            />
          )}
          <Option
            text="Delete booking"
            icon={MdOutlineDeleteForever}
            clickHandler={() => setIsDeleteModalOpen(true)}
          />
        </OptionButton>
      )}
      {isDeleteModalOpen &&
        createPortal(
          <DeleteBookingModal
            closeModal={() => setIsDeleteModalOpen(false)}
            deleteHandler={deleteHandler}
          />,
          document.body
        )}
    </li>
  );
};

export default SingleBooking;

import { createPortal } from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineRemoveRedEye,
  MdOutlineFileDownload,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { SingleBookingProps } from "src/types/types";
import { deleteBooking } from "src/api/BookingsApi";
import { showToast } from "src/utils/toast";
import Amount from "../common/Amount";
import OpenModalOptions from "./OpenModalOptions";
import Status from "./Status";
import OptionButton from "./OptionButton";
import ButtonWrapper from "./ButtonWrapper";
import PrimaryActionButton from "../common/PrimaryActionButton";
import Option from "../common/Option";
import useClickOutside from "src/hooks/useClickOutside";
import BookingModal from "./BookingModal";
import { formatDate, timeDifference } from "src/utils/helpers";

const SingleBooking = ({ booking, setBookings }: SingleBookingProps) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    numNights,
    roomId,
    startDate,
    endDate,
    status,
    totalPrice,
    Guests: { email, fullName },
    id: bookingId,
  } = booking;

  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsOptionsModalOpen(false),
    isOptionsModalOpen
  );

  const seeDetails = () => {
    navigate(`/bookings/${bookingId}`);
  };

  const deleteHandler = async () => {
    await deleteBooking(bookingId);
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    showToast("Booking deleted successfully", "success");
  };

  const updateHandler = () => {
    navigate(`/bookings/checkIn/${bookingId}`);
  };

  return (
    <li className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center py-1 bg-neutral-50 relative dark:bg-slate-500">
      <p className="pl-4">{roomId}</p>
      <div className="flex flex-col gap-2">
        <h2>{fullName}</h2>
        <h3 className="text-sm">{email}</h3>
      </div>
      <div className="flex flex-col">
        <span className="text-base">
          {status === "Checked out" ? "Over" : "In"} {timeDifference(startDate)} → {""}
          {numNights} night stay
        </span>
        <span className="text-sm">
          {formatDate(startDate)} — {formatDate(endDate)}
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
    </li>
  );
};

export default SingleBooking;

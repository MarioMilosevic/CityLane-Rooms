import { createPortal } from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineRemoveRedEye,
  MdOutlineFileDownload,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { SingleBookingProps } from "src/types/types";
import { deleteBooking, checkOutBooking } from "src/api/BookingsApi";
import { showToast } from "src/utils/toast";
import { formatDate, timeDifference } from "src/utils/helpers";
import Amount from "../common/Amount";
import OpenModalOptions from "./OpenModalOptions";
import Status from "./Status";
import OptionButton from "../common/OptionButton";
import ButtonWrapper from "./ButtonWrapper";
import PrimaryActionButton from "../common/PrimaryActionButton";
import Option from "../common/Option";
import useClickOutside from "src/hooks/useClickOutside";
import BookingModal from "./BookingModal";

const SingleBooking = ({
  booking,
  setBookings,
  setNumberOfBookings,
}: SingleBookingProps) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"delete" | "checkout" | null>(
    null
  );
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
    try {
      await deleteBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      setNumberOfBookings((prev) => prev - 1);
      showToast("Booking deleted successfully", "success");
      closeModal();
    } catch (error) {
      showToast("Unable to delete booking", "error");
      console.error("Unexpected error occured", error);
    }
  };

  const goToCheckIn = () => {
    navigate(`/bookings/checkIn/${bookingId}`);
  };

  const checkOut = async () => {
    const checkedOutBooking = await checkOutBooking(bookingId);
    if (checkedOutBooking) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "Checked out" }
            : booking
        )
      );
    }
    closeModal();
  };

  const openModal = (type: "delete" | "checkout") => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="grid lg:grid-cols-[2fr_5fr_5fr_4fr_4fr] lg:gap-6 grid-cols-[1fr_2fr_2fr_2fr_2fr] place-content-center items-center mb-1 py-1 bg-neutral-50 relative dark:bg-slate-500">
      <p className="lg:pl-4 text-xs text-center">{roomId}</p>
      <div className="flex flex-col justify-self-start pl-1 gap-2 text-sm">
        <h2 className="lg:text-base text-sm">{fullName}</h2>
        <h3 className="lg:block hidden text-sm">{email}</h3>
      </div>
      <div className="flex flex-col">
        <span className="lg:block hidden text-base">
          {status === "Checked out" ? "Over" : "In"} {timeDifference(startDate)}{" "}
          → {""}
          {numNights} night stay
        </span>
        <span className="lg:text-sm text-xs">
          {formatDate(startDate)} — {formatDate(endDate)}
        </span>
      </div>
      <Status status={status} />
      <Amount value={totalPrice} type="amount" position="center"/>
      <OpenModalOptions clickHandler={() => setIsOptionsModalOpen(true)} />
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
              clickHandler={
                status === "Checked in"
                  ? () => openModal("checkout")
                  : goToCheckIn
              }
            />
          )}
          <Option
            text="Delete booking"
            icon={MdOutlineDeleteForever}
            clickHandler={() => openModal("delete")}
          />
        </OptionButton>
      )}
      {modalType &&
        createPortal(
          <BookingModal
            title={
              modalType === "delete" ? "Delete booking" : "Check out booking"
            }
            closeModal={closeModal}
          >
              <p>
                {modalType === "delete"
                  ? "Are you sure you want to delete this booking permanently? This action cannot be undone."
                  : `Are you sure you want to check out ${fullName}? This action cannot be undone.`}
              </p>
            <ButtonWrapper justify="end">
              <PrimaryActionButton
                text="Cancel"
                color="white"
                clickHandler={closeModal}
              />
              <PrimaryActionButton
                text={modalType === "delete" ? "Delete" : "Check out"}
                color={modalType === "delete" ? "red" : "yellow"}
                clickHandler={modalType === "delete" ? deleteHandler : checkOut}
              />
            </ButtonWrapper>
          </BookingModal>,
          document.body
        )}
    </div>
  );
};

export default SingleBooking;

import {
  editBookingSchema,
  editBookingFormValues,
} from "src/validation/editBookingSchema";
import { useParams, useNavigate } from "react-router-dom";
import { BookingType } from "src/types/types";
import { pricePerBreakfast } from "src/utils/constants";
import BookingHeader from "./BookingHeader";
import useFetchSingleBooking from "src/hooks/useFetchSingleBooking";
import BookingSection from "./BookingSection";
import CheckboxSection from "./CheckboxSection";
import LoadingSpinner from "./LoadingSpinner";
import ButtonWrapper from "./ButtonWrapper";
import Amount from "../common/Amount";
import { createPortal } from "react-dom";
import PrimaryActionButton from "../common/PrimaryActionButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatPrice } from "src/utils/helpers";
import { useForm } from "react-hook-form";
import { checkInBooking, checkOutBooking } from "src/api/BookingsApi";
import { showToast } from "src/utils/toast";
import BookingModal from "./BookingModal";
import { useState } from "react";

const CheckInBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);


  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<editBookingFormValues>({
    defaultValues: {
      breakfast: false,
      confirmation: false,
    },
    resolver: zodResolver(editBookingSchema),
    mode: "onChange",
  });

  const goBack = () => {
    navigate("/bookings");
  };

  if (loading || !singleBooking) return <LoadingSpinner />;


  const breakfastChecked = watch("breakfast");

  const totalBreakfastPrice = breakfastChecked
    ? singleBooking?.numNights * singleBooking?.numGuests * pricePerBreakfast
    : 0;
  const totalPrice = singleBooking.totalPrice + totalBreakfastPrice;

  const onSubmitCheckIn = async (formData: editBookingFormValues) => {
    const updatedBooking: Partial<BookingType> = {
      hasBreakfast: formData.breakfast,
      isPaid: true,
      extrasPrice: totalBreakfastPrice,
      totalPrice: totalPrice,
      status: "Checked in",
    };
    await checkInBooking(Number(bookingId), updatedBooking);
    showToast(`${singleBooking.fullName} checked in`, "success");
    goBack();
  };

  const checkOut = async () => {
    await checkOutBooking(Number(bookingId), "Checked out");
    goBack();
  };

  return (
    <div className="min-h-[50vh] flex flex-col gap-8">
      <BookingHeader
        title={`${
          singleBooking.status === "Unconfirmed" ? "Check in" : "Check out"
        } #${bookingId}`}
        status={singleBooking?.status}
        goBack={goBack}
      />
      <BookingSection data={singleBooking as BookingType} />
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmitCheckIn)}
      >
        {!singleBooking.hasBreakfast && singleBooking.status === "Unconfirmed" && (
          <CheckboxSection zod={{ ...register("breakfast") }}>
            <span>Want to add breakfast for:</span>
            <Amount
              value={
                singleBooking?.numNights *
                singleBooking?.numGuests *
                pricePerBreakfast
              }
              type="amount"
            />
          </CheckboxSection>
        )}
        {singleBooking.status === "Unconfirmed" && (
          <CheckboxSection zod={{ ...register("confirmation") }}>
            <span>
              I confirm that {singleBooking?.fullName} has paid the total amount
              of{" "}
            </span>
            <Amount value={totalPrice} type="amount" />
            {totalBreakfastPrice > 0 && (
              <span>
                {`($${formatPrice(singleBooking.totalPrice)} + $${formatPrice(
                  totalBreakfastPrice
                )})`}
              </span>
            )}
          </CheckboxSection>
        )}
        <ButtonWrapper justify="end">
          {singleBooking.status === "Unconfirmed" && (
            <PrimaryActionButton
              isDisabled={!isValid}
              color="yellow"
              text={`Check in booking #${bookingId}`}
              type="submit"
            />
          )}
          {singleBooking.status === "Checked in" && (
            <PrimaryActionButton
              color="yellow"
              text={`Check out booking #${bookingId}`}
              clickHandler={() => setIsModalOpen(true)}
            />
          )}
          <PrimaryActionButton
            color="white"
            text="Back"
            clickHandler={goBack}
          />
        </ButtonWrapper>
      </form>
      {isModalOpen &&
        createPortal(
          <BookingModal
            title="Check out booking"
            closeModal={() => setIsModalOpen(false)}
          >
            <p>
              Are you sure you want to check out {" "}
              <span className="font-medium text-lg">{singleBooking.fullName}</span>?
            </p>
            <ButtonWrapper justify="end">
              <PrimaryActionButton
                text="Cancel"
                color="white"
                clickHandler={() => setIsModalOpen(false)}
              />
              <PrimaryActionButton
                text="Check out"
                color="yellow"
                clickHandler={checkOut}
              />
            </ButtonWrapper>
          </BookingModal>,
          document.body
        )}
    </div>
  );
};

export default CheckInBooking;

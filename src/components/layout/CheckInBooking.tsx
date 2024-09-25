import {
  editBookingSchema,
  editBookingFormValues,
} from "src/validation/editBookingSchema";
import { useParams, useNavigate } from "react-router-dom";
import { BookingType } from "src/types/types";
import BookingHeader from "./BookingHeader";
import BookingSection from "./BookingSection";
import CheckboxSection from "./CheckboxSection";
import LoadingSpinner from "../common/LoadingSpinner";
import ButtonWrapper from "./ButtonWrapper";
import Amount from "../common/Amount";
import PrimaryActionButton from "../common/PrimaryActionButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchSingleBooking } from "src/api/BookingsApi";
import { formatPrice } from "src/utils/helpers";
import { useForm } from "react-hook-form";
import { checkInBooking, toggleHasBreakfast } from "src/api/BookingsApi";
import { showToast } from "src/utils/toast";
import { useEffect, useState } from "react";
import { fetchSettings } from "src/api/SettingsApi";
let breakfastPrice: number = 0;

const CheckInBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [singleBooking, setSingleBooking] = useState<BookingType>();
  useEffect(() => {
    const fetchBreakfastPriceAndSingleBooking = async () => {
      try {
        const [settingsResult, singleBooking] = await Promise.all([
          fetchSettings("breakfastPrice"),
          fetchSingleBooking(Number(bookingId)),
        ]);
        breakfastPrice = settingsResult?.breakfastPrice ?? 0;
        setSingleBooking(singleBooking);
      } catch (error) {
        console.error("Unexpected error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBreakfastPriceAndSingleBooking();
  }, [bookingId]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<editBookingFormValues>({
    defaultValues: {
      breakfast: false,
      confirmation: false,
    },
    resolver: zodResolver(editBookingSchema),
    mode: "onChange",
  });

  if (loading || !singleBooking) return <LoadingSpinner />;

  const {
    hasBreakfast,
    numGuests,
    numNights,
    id,
    Guests: { fullName },
    status,
    totalPrice: bookingPrice,
  } = singleBooking;

  const totalBreakfastPrice = numGuests * numNights * breakfastPrice;

  const totalBookingPrice = hasBreakfast
    ? bookingPrice + totalBreakfastPrice
    : bookingPrice;

  const handleBreakfast = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const checkedValue = e.target.checked;
      const response = await toggleHasBreakfast(checkedValue, id);
      if (response) {
        setSingleBooking((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            hasBreakfast: checkedValue,
          };
        });
      }
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  const goBack = () => {
    navigate("/bookings");
  };

  const onSubmit = async (formData: editBookingFormValues) => {
    const updateExtrasPrice = formData.breakfast ? totalBreakfastPrice : 0;
    const updatedBooking: Partial<BookingType> = {
      hasBreakfast: formData.breakfast,
      isPaid: true,
      extrasPrice: updateExtrasPrice,
      totalPrice: totalBookingPrice,
      status: "Checked in",
    };
    await checkInBooking(Number(bookingId), updatedBooking);
    showToast(`${fullName} checked in`);
    navigate(`/bookings/${bookingId}`)
  };

  return (
    <div className="min-h-[50vh] flex flex-col gap-8">
      <BookingHeader
        title={`${
          status === "Unconfirmed" ? "Check in" : "Check out"
        } #${bookingId}`}
        status={status}
        goBack={goBack}
      />
      <BookingSection booking={singleBooking as BookingType} />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {status === "Unconfirmed" && (
          <CheckboxSection
            zod={{ ...register("breakfast") }}
            changeHandler={(e) => handleBreakfast(e)}
            checked={hasBreakfast}
          >
            <div className="flex items-center justify-between gap-1">
              <p className="lg:text-base text-sm">Want to add breakfast for:</p>
              <Amount
                value={totalBreakfastPrice}
                type="amount"
                position="start"
              />
            </div>
          </CheckboxSection>
        )}
        {status === "Unconfirmed" && (
          <CheckboxSection zod={{ ...register("confirmation") }}>
            <div className="flex justify-between gap-1 items-center lg:pl-0 pl-4">
              <p className="lg:text-base text-sm">
                I confirm that <span className="font-medium">{fullName}</span>{" "}
                has paid the total amount of:{" "}
              </p>
              <Amount
                value={totalBookingPrice}
                type="amount"
                position="start"
              />
            </div>
            {hasBreakfast && (
              <span className="lg:block hidden">{` ($${formatPrice(
                bookingPrice
              )} + $${formatPrice(totalBreakfastPrice)})`}</span>
            )}
          </CheckboxSection>
        )}

        <ButtonWrapper justify="end">
          {status === "Unconfirmed" && (
            <PrimaryActionButton
              isDisabled={!isValid}
              color={isValid ? "yellow" : "gray"}
              text={`Check in booking #${bookingId}`}
              type="submit"
            />
          )}
          <PrimaryActionButton
            color="white"
            text="Back"
            clickHandler={goBack}
          />
        </ButtonWrapper>
      </form>
    </div>
  );
};

export default CheckInBooking;

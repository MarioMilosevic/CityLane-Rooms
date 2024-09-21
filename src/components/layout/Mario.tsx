import {
  editBookingSchema,
  editBookingFormValues,
} from "src/validation/editBookingSchema";
import { useParams, useNavigate } from "react-router-dom";
import { BookingType } from "src/types/types";
import BookingHeader from "./BookingHeader";
import BookingSection from "./BookingSection";
import CheckboxSection from "./CheckboxSection";
import LoadingSpinner from "./LoadingSpinner";
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
// const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);

const CheckInBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [singleBooking, setSingleBooking] = useState<BookingType>();
  const [breakfastPrice, setBreakfastPrice] = useState<number>(0);
  const [willPayBreakfast, setWillPayBreakfast] = useState<boolean>(false);
  const [confirmCheckIn, setConfirmCheckIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchBreakfastPriceAndSingleBooking = async () => {
      try {
        const [settingsResult, singleBooking] = await Promise.all([
          fetchSettings("breakfastPrice"),
          fetchSingleBooking(Number(bookingId)),
        ]);

        const { breakfastPrice } = settingsResult;
        setBreakfastPrice(breakfastPrice);
        setSingleBooking(singleBooking);
        setWillPayBreakfast(singleBooking.hasBreakfast);
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

  const goBack = () => {
    navigate("/bookings");
  };

  if (loading || !singleBooking) return <LoadingSpinner />;

  const totalBreakfastPrice =
    singleBooking.numGuests * singleBooking.numNights * breakfastPrice;

  const totalPriceWithBreakfast =
    singleBooking.totalPrice + totalBreakfastPrice;

  const onSubmitCheckIn = async (formData: editBookingFormValues) => {
    const updatedBooking: Partial<BookingType> = {
      hasBreakfast: formData.breakfast,
      isPaid: true,
      extrasPrice: totalBreakfastPrice,
      totalPrice: totalPriceWithBreakfast,
      status: "Checked in",
    };
    await checkInBooking(Number(bookingId), updatedBooking);
    showToast(`${singleBooking.Guests.fullName} checked in`, "success");
    goBack();
  };

  const handleBreakfast = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = e.target.checked;
    setWillPayBreakfast(checkedValue);
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
      <BookingSection booking={singleBooking as BookingType} />
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmitCheckIn)}
      >
        {!singleBooking.hasBreakfast &&
          singleBooking.status === "Unconfirmed" && (
            <CheckboxSection
              zod={{ ...register("breakfast") }}
              changeHandler={(e) => handleBreakfast(e)}
            >
              <span>Want to add breakfast for:</span>
              <Amount value={totalBreakfastPrice} type="amount" />
            </CheckboxSection>
          )}
        {singleBooking.status === "Unconfirmed" && (
          <CheckboxSection zod={{ ...register("confirmation") }}>
            <span>
              I confirm that {singleBooking?.Guests.fullName} has paid the total
              amount of{" "}
            </span>
            <Amount
              value={
                willPayBreakfast
                  ? totalPriceWithBreakfast
                  : singleBooking.totalPrice
              }
              type="amount"
            />
            {willPayBreakfast && (
              <span>{`($${formatPrice(
                singleBooking.totalPrice
              )} + $${formatPrice(totalBreakfastPrice)})`}</span>
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
          {/* {singleBooking.status === "Checked in" && (
            <PrimaryActionButton
              color="yellow"
              text={`Check out booking #${bookingId}`}
              clickHandler={() => setIsModalOpen(true)}
            />
          )} */}
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

/*
!singleBooking.hasBreakfast ? && prikazi taj CHEKBOX

a klikcanjem cu da modifikujem extrasPrice
a ovamo cu ako je extrasPrice > 0 da kazem ovo sotalo

*/

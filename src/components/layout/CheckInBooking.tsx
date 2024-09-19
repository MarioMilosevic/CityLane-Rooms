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
import useBookingData from "src/hooks/useBookingData";
import CheckboxSection from "./CheckboxSection";
import LoadingSpinner from "./LoadingSpinner";
import ButtonWrapper from "./ButtonWrapper";
import Amount from "../common/Amount";
import PrimaryActionButton from "../common/PrimaryActionButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatPrice } from "src/utils/helpers";
import { useForm } from "react-hook-form";
import { checkInBooking } from "src/api/BookingsApi";
import { showToast } from "src/utils/toast";

const CheckInBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);
  const bookingData = useBookingData(singleBooking as BookingType, loading);

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

  if (loading || !bookingData) return <LoadingSpinner />;

  const breakfastChecked = watch("breakfast");

  const totalBreakfastPrice = breakfastChecked
    ? bookingData?.numNights * bookingData?.numGuests * pricePerBreakfast
    : 0;
  const totalPrice = bookingData.totalPrice + totalBreakfastPrice;

  const onSubmit = async (formData: editBookingFormValues) => {
    const updatedBooking:Partial<BookingType> = {
      hasBreakfast: formData.breakfast,
      isPaid: true,
      extrasPrice: totalBreakfastPrice,
      totalPrice: totalPrice,
      status:"Checked in"
    };
    await checkInBooking(Number(bookingId), updatedBooking)
    showToast(`${bookingData.fullName} checked in`, 'success')
    goBack()
  };

  return (
    <div className="min-h-[50vh] flex flex-col gap-8">
      <BookingHeader
        status={bookingData?.status}
        bookingId={bookingId as string}
        goBack={goBack}
      />
      <BookingSection data={bookingData} />
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        {!bookingData.hasBreakfast && 
          <CheckboxSection zod={{ ...register("breakfast") }}>
            <span>Want to add breakfast for:</span>
            <Amount
              value={
                bookingData?.numNights *
                bookingData?.numGuests *
                pricePerBreakfast
              }
              type="amount"
              />
          </CheckboxSection>
            }
          <CheckboxSection zod={{ ...register("confirmation") }}>
            <span>
              I confirm that {bookingData?.fullName} has paid the total amount
              of{" "}
            </span>
            <Amount value={totalPrice} type="amount" />
            {totalBreakfastPrice > 0 && (
              <span>
                {`($${formatPrice(bookingData.totalPrice)} + $${formatPrice(
                  totalBreakfastPrice
                )})`}
              </span>
            )}
          </CheckboxSection>
          <ButtonWrapper justify="end">
            <PrimaryActionButton
              isDisabled={!isValid}
              color="yellow"
              text={`Check in booking #${bookingId}`}
              type="submit"
            />
            <PrimaryActionButton color="white" text="Back" clickHandler={goBack}/>
          </ButtonWrapper>
        </form>
    </div>
  );
};

export default CheckInBooking;

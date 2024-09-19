import {
  editBookingSchema,
  editBookingFormValues,
} from "src/validation/editBookingSchema";
import { useParams, useNavigate } from "react-router-dom";
import { BookingType } from "src/types/types";
import { breakfastPrice } from "src/utils/constants";
import BookingHeader from "./BookingHeader";
import useFetchSingleBooking from "src/hooks/useFetchSingleBooking";
import BookingSection from "./BookingSection";
import useBookingData from "src/hooks/useBookingData";
import CheckboxSection from "./CheckboxSection";
import LoadingSpinner from "./LoadingSpinner";
import ButtonWrapper from "./ButtonWrapper";
import Amount from "../common/Amount";
import PrimaryActionButton from "../common/PrimaryActionButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const EditBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { loading, singleBooking } = useFetchSingleBooking(bookingId as string);
  const bookingData = useBookingData(singleBooking as BookingType, loading);
  const [totalBreakfastPrice, setTotalBreakfastPrice] = useState<number>(
    bookingData?.totalPrice + bookingData?.extrasPrice || 0
  );
  const form = useForm<editBookingFormValues>({
    defaultValues: {
      breakfast: false,
      confirmation: false,
    },
    resolver: zodResolver(editBookingSchema),
    mode: "onChange",
  });

  const handleBreakfastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(bookingData?.numNights)
    console.log(bookingData?.numGuests)
    console.log(breakfastPrice)
    const breakfastTotalPrice = bookingData?.numNights * bookingData?.numGuests * breakfastPrice;
    console.log(breakfastTotalPrice)
    if (e.target.checked) {
      setTotalBreakfastPrice(
        bookingData?.totalPrice + breakfastTotalPrice
      )
    } else {
      setTotalBreakfastPrice(0)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = form;

  const goBack = () => {
    navigate("/bookings");
  };

  const onSubmit = async (formData: editBookingFormValues) => {
    console.log(formData);
    console.log(totalBreakfastPrice)
  };

  if (loading || !bookingData) return <LoadingSpinner />;
  const breakfastTotalPrice = bookingData.numNights * breakfastPrice;

  return (
    <div className="min-h-[50vh] flex flex-col gap-8">
      <BookingHeader
        status={bookingData?.status}
        bookingId={bookingId as string}
        goBack={goBack}
      />
      {bookingData && <BookingSection data={bookingData} />}
      {!bookingData.hasBreakfast && (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <CheckboxSection zod={{ ...register("breakfast") }} onChange={handleBreakfastChange}>
            <span>Want to add breakfast for:</span>
            <Amount value={breakfastTotalPrice} type="amount" />
          </CheckboxSection>
          <CheckboxSection zod={{ ...register("confirmation") }}>
            <span>
              I confirm that {bookingData?.fullName} has paid the total amount
              of{" "}
            </span>
            <Amount value={bookingData.totalPrice + breakfastTotalPrice} type="amount" />
            {bookingData.totalPrice + bookingData.extrasPrice}
          </CheckboxSection>
          <ButtonWrapper justify="end">
            <PrimaryActionButton
              color="yellow"
              text={`Check in booking #${bookingId}`}
              type="submit"
            />
            <PrimaryActionButton color="white" text="Back" />
          </ButtonWrapper>
        </form>
      )}
    </div>
  );
};

export default EditBooking;

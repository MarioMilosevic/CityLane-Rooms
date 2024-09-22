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
import { checkInBooking } from "src/api/BookingsApi";
import { showToast } from "src/utils/toast";
import { useEffect, useState } from "react";
import { fetchSettings } from "src/api/SettingsApi";

const CheckInBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [singleBooking, setSingleBooking] = useState<BookingType>();
  const [breakfastPrice, setBreakfastPrice] = useState<number>(0);
  const [willAddBreakfast, setWillAddBreakfast] = useState<boolean>(false);

  // da li da koristim 1 useEffect ili da koristim 2 jer imam 2 custom hooka
  useEffect(() => {
    const fetchBreakfastPriceAndSingleBooking = async () => {
      try {
        const [settingsResult, singleBooking] = await Promise.all([
          fetchSettings("breakfastPrice"),
          fetchSingleBooking(Number(bookingId)),
        ]);

        const { breakfastPrice } = settingsResult;
        setBreakfastPrice(breakfastPrice as number);
        setSingleBooking(singleBooking);
        setWillAddBreakfast(singleBooking.hasBreakfast);
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

  const onSubmit = async (formData: editBookingFormValues) => {
    const updateExtrasPrice = formData.breakfast ? totalBreakfastPrice : 0;
    const updatedBooking: Partial<BookingType> = {
      hasBreakfast: formData.breakfast,
      isPaid: true,
      extrasPrice: updateExtrasPrice,
      totalPrice: totalPriceWithBreakfast,
      status: "Checked in",
    };
    await checkInBooking(Number(bookingId), updatedBooking);
    showToast(`${singleBooking.Guests.fullName} checked in`, "success");
    goBack();
  };

  const handleBreakfast = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = e.target.checked;
    setWillAddBreakfast(checkedValue);
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
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
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
                willAddBreakfast
                  ? totalPriceWithBreakfast
                  : singleBooking.totalPrice
              }
              type="amount"
            />
            {willAddBreakfast && (
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

// import {
//   editBookingSchema,
//   editBookingFormValues,
// } from "src/validation/editBookingSchema";
// import { useParams, useNavigate } from "react-router-dom";
// import { BookingType } from "src/types/types";
// import BookingHeader from "./BookingHeader";
// import BookingSection from "./BookingSection";
// import CheckboxSection from "./CheckboxSection";
// import LoadingSpinner from "./LoadingSpinner";
// import ButtonWrapper from "./ButtonWrapper";
// import Amount from "../common/Amount";
// import PrimaryActionButton from "../common/PrimaryActionButton";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { fetchSingleBooking } from "src/api/BookingsApi";
// import { formatPrice } from "src/utils/helpers";
// import { useForm } from "react-hook-form";
// import { checkInBooking, toggleHasBreakfast } from "src/api/BookingsApi";
// import { showToast } from "src/utils/toast";
// import { useEffect, useState } from "react";
// import { fetchSettings } from "src/api/SettingsApi";

// const CheckInBooking = () => {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [singleBooking, setSingleBooking] = useState<BookingType>();
//   const [breakfastPrice, setBreakfastPrice] = useState<number>(0);

//   useEffect(() => {
//     const fetchBreakfastPriceAndSingleBooking = async () => {
//       try {
//         const [settingsResult, singleBooking] = await Promise.all([
//           fetchSettings("breakfastPrice"),
//           fetchSingleBooking(Number(bookingId)),
//         ]);

//         const { breakfastPrice } = settingsResult;
//         setBreakfastPrice(breakfastPrice as number);
//         setSingleBooking(singleBooking);
//       } catch (error) {
//         console.error("Unexpected error", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBreakfastPriceAndSingleBooking();
//   }, [bookingId]);

//   const {
//     register,
//     handleSubmit,
//     formState: { isValid },
//   } = useForm<editBookingFormValues>({
//     defaultValues: {
//       breakfast: false,
//       confirmation: false,
//     },
//     resolver: zodResolver(editBookingSchema),
//     mode: "onChange",
//   });

//   if (loading || !singleBooking) return <LoadingSpinner />;

//   const totalBreakfastPrice =
//     singleBooking.numGuests * singleBooking.numNights * breakfastPrice;

//   const totalPrice = singleBooking.hasBreakfast
//     ? singleBooking.totalPrice + totalBreakfastPrice
//     : singleBooking.totalPrice;

//   const handleBreakfast = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     // vrati ovo placeno na false
//     try {
//       const checkedValue = e.target.checked;
//       const response = await toggleHasBreakfast(checkedValue, singleBooking.id);
//       if (response) {
//         setSingleBooking((prev) => {
//           if (!prev) return prev;
//           return {
//             ...prev,
//             hasBreakfast: checkedValue,
//           };
//         });
//       }
//     } catch (error) {
//       console.error("Error occurred", error);
//     }
//   };

//   const goBack = () => {
//     navigate("/bookings");
//   };

//   const onSubmit = async (formData: editBookingFormValues) => {
//     const updateExtrasPrice = formData.breakfast ? totalBreakfastPrice : 0
//     const updatedBooking: Partial<BookingType> = {
//       hasBreakfast: formData.breakfast,
//       isPaid: true,
//       extrasPrice: updateExtrasPrice,
//       totalPrice: totalPrice,
//       status: "Checked in",
//     };
//     await checkInBooking(Number(bookingId), updatedBooking);
//     showToast(`${singleBooking.Guests.fullName} checked in`, "success");
//     goBack();
//   };

//   return (
//     <div className="min-h-[50vh] flex flex-col gap-8">
//       <BookingHeader
//         title={`${
//           singleBooking.status === "Unconfirmed" ? "Check in" : "Check out"
//         } #${bookingId}`}
//         status={singleBooking?.status}
//         goBack={goBack}
//       />
//       <BookingSection booking={singleBooking as BookingType} />
//       <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
//         {/* ako nema brakfast */}
//         {!singleBooking.extrasPrice &&
//           singleBooking.status === "Unconfirmed" && (
//             <CheckboxSection
//               zod={{ ...register("breakfast") }}
//               changeHandler={(e) => handleBreakfast(e)}
//             >
//               <span>Want to add breakfast for:</span>
//               <Amount value={totalBreakfastPrice} type="amount" />
//             </CheckboxSection>
//           )}
//         {singleBooking.status === "Unconfirmed" && (
//           <CheckboxSection zod={{ ...register("confirmation") }}>
//             <span>
//               I confirm that {singleBooking?.Guests.fullName} has paid the total
//               amount of{" "}
//             </span>
//             <Amount value={totalPrice} type="amount" />
//             {singleBooking.hasBreakfast && (
//               <span>{`($${formatPrice(
//                 singleBooking.totalPrice
//               )} + $${formatPrice(totalBreakfastPrice)})`}</span>
//             )}
//           </CheckboxSection>
//         )}

//         <ButtonWrapper justify="end">
//           {singleBooking.status === "Unconfirmed" && (
//             <PrimaryActionButton
//               isDisabled={!isValid}
//               color={isValid ? "yellow" : "gray"}
//               text={`Check in booking #${bookingId}`}
//               type="submit"
//             />
//           )}
//           <PrimaryActionButton
//             color="white"
//             text="Back"
//             clickHandler={goBack}
//           />
//         </ButtonWrapper>
//       </form>
//     </div>
//   );
// };

// export default CheckInBooking;

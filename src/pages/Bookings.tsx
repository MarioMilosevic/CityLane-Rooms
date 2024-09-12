import { useState } from "react";
import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import { bookingsSortOptions, bookingsTabs } from "src/utils/constants";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SingleBooking from "src/components/layout/SingleBooking";
import supabase from "src/config/supabaseClient";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import useFetchData from "src/hooks/useFetchData";
import { fetchBookings } from "src/api/BookingsApi";
import { BookingType } from "src/types/types";

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);

  const loading = useFetchData(setBookings, fetchBookings);

  const addGuests = async () => {
    try {
      const { error } = await supabase.from("Bookings").insert(bookings);
      if (error) {
        console.log("Unable to add guests", error);
        return error;
      } else {
        console.log("Guests added successfully");
      }
    } catch (error) {
      console.log("Error in addGuests catch", error);
    }
  };

  console.log(bookings);
  console.log(loading);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HeadingContainer title="All bookings">
        <SearchFilterTab
          tabOptions={bookingsTabs}
          sortOptions={bookingsSortOptions}
        />
      </HeadingContainer>
      <ContentWrapper>
        <ContentHeaderWrapper>
          <ContentHeader title="Room" />
          <ContentHeader title="Guest" />
          <ContentHeader title="Dates" />
          <ContentHeader title="Status" />
          <ContentHeader title="Amount" />
        </ContentHeaderWrapper>
        <ContentRowWrapper>
          {bookings.map((booking) => (
            <SingleBooking key={booking.id} {...booking} />
          ))}
        </ContentRowWrapper>
      </ContentWrapper>
      <button onClick={addGuests}>Click me</button>
    </>
  );
};

export default Bookings;

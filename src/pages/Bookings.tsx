import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import { bookingsSortOptions, bookingsTabs } from "src/utils/constants";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SingleBooking from "src/components/layout/SingleBooking";
import supabase from "src/config/supabaseClient";
import { bookings } from "src/data/data-bookings";
import useFetchData from "src/hooks/useFetchData";
import { useState } from "react";
const Bookings = () => {
  const [bookings, setBookings] = useState()
  
  // const loading = useFetchData(setBookings)

  const addGuests = async () => {
    try {
      const { error } = await supabase.from("Bookings").insert(bookings)
      if (error) {
        console.log('Unable to add guests', error)
        return error
      } else {
        console.log('valjda se dodalo')
      }
    } catch (error) {
      console.log('uslo u catch', error)
    }
  }

  return (
    <>
      <HeadingContainer title="All bookings">
        <SearchFilterTab
          tabOptions={bookingsTabs}
          sortOptions={bookingsSortOptions}
        />
      </HeadingContainer>
      <ContentWrapper>
        <ContentHeaderWrapper>
          <ContentHeader title="Room"/>
          <ContentHeader title="Guest"/>
          <ContentHeader title="Dates"/>
          <ContentHeader title="Status"/>
          <ContentHeader title="Amount"/>
        </ContentHeaderWrapper>
        <ContentRowWrapper>
          <SingleBooking amount={1200} status="checkedIn"/>
          <SingleBooking amount={975} status="checkedOut"/>
          <SingleBooking amount={800} status="unconfirmed"/>
          <SingleBooking amount={29400} status="unconfirmed"/>
          <SingleBooking amount={200} status="checkedOut"/>
        </ContentRowWrapper>
      </ContentWrapper>
        <button onClick={addGuests}>Click me</button>
    </>
  );
};

export default Bookings;

import { useState } from "react";
import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import { bookingsSortOptions, bookingsTabs } from "src/utils/constants";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SingleBooking from "src/components/layout/SingleBooking";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import { useEffect } from "react";
// import useFetchData from "src/hooks/useFetchData";
import { fetchBookings } from "src/api/BookingsApi";
import { BookingType } from "src/types/types";
import { useSearchParams } from "react-router-dom";
import { filterBookings } from "src/api/BookingsApi";

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
   const [searchParams] = useSearchParams();
   const filterValue = searchParams.get("status") || "All";
   const sortValue = searchParams.get("sort") || "date (recent first)";
   console.log(filterValue);
  useEffect(() => {
    const fetchAndSetBookings = async () => {
      try {
        setLoading(true);
        const data = await filterBookings(filterValue);
        // console.log("data: ", data);
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetBookings();
  }, [filterValue]);

   


  // const loading = useFetchData(setBookings, fetchBookings);

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
    </>
  );
};

export default Bookings;

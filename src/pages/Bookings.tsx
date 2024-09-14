import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import { bookingsSortOptions, bookingsTabs } from "src/utils/constants";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SingleBooking from "src/components/layout/SingleBooking";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import { useEffect, useState } from "react";
import { BookingType } from "src/types/types";
import { useSearchParams } from "react-router-dom";
import { fetchBookings } from "src/api/BookingsApi";

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "All";
  const sortValue = searchParams.get("sort") || "date (upcoming first)";

  useEffect(() => {
    const fetchAndSetBookings = async () => {
      try {
        setLoading(true);
        const data = await fetchBookings(filterValue, sortValue);
        setBookings(data as BookingType[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetBookings();
  }, [filterValue, sortValue]);

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

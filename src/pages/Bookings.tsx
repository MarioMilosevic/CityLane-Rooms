import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SingleBooking from "src/components/layout/SingleBooking";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import Pagination from "src/components/layout/Pagination";
import ButtonWrapper from "src/components/layout/ButtonWrapper";
import {
  bookingsSortOptions,
  bookingsTabs,
  itemsPerPage,
} from "src/utils/constants";
// import { useEffect, useState } from "react";
// import { BookingType } from "src/types/types";
// import { useSearchParams } from "react-router-dom";
// import { fetchBookings } from "src/api/BookingsApi";
import useFetchBookings from "src/hooks/useFetchBookings";
import ShowResults from "src/components/layout/ShowResults";

const Bookings = () => {
  const {bookings, loading, numberOfBookings, currentPage} = useFetchBookings()
  // const [bookings, setBookings] = useState<BookingType[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [numberOfBookings, setNumberOfBookings] = useState<number>(0);
  // const [searchParams] = useSearchParams();

  // const filterValue = searchParams.get("status") || "All";
  // const sortValue = searchParams.get("sort") || "date (upcoming first)";
  // const currentPage = Number(searchParams.get("page")) || 1;
  // useEffect(() => {
  //   const fetchAndSetBookings = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetchBookings(
  //         filterValue,
  //         sortValue,
  //         currentPage
  //       );

  //       if (response) {
  //         const { data, count } = response;
  //         setNumberOfBookings(count || 0);
  //         setBookings(data as BookingType[]);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAndSetBookings();
  // }, [filterValue, sortValue, currentPage]);

  const from = (currentPage - 1) * itemsPerPage + 1;

  let to = from + itemsPerPage - 1;
  if (to > numberOfBookings) {
    to = numberOfBookings;
  }

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
        <ButtonWrapper justify="between">
          <ShowResults from={from} to={to} numberOfItems={numberOfBookings} />
          {numberOfBookings > itemsPerPage && (
            <Pagination numberOfItems={numberOfBookings} />
          )}
        </ButtonWrapper>
      </ContentWrapper>
    </>
  );
};

export default Bookings;

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
import useFetchData from "src/hooks/useFetchData";
import ShowResults from "src/components/layout/ShowResults";
import { fetchBookings } from "src/api/BookingsApi";
import { BookingType } from "src/types/types";

const Bookings = () => {
  const {
    data: bookings,
    loading,
    numberOfItems,
    currentPage,
  } = useFetchData("bookings", fetchBookings);

  const showResultsFrom = (currentPage - 1) * itemsPerPage + 1
  let showResultsTo = showResultsFrom + itemsPerPage - 1;
  if (showResultsTo > numberOfItems) {
    showResultsTo = numberOfItems;
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
            <SingleBooking key={booking.id} booking={booking as BookingType} />
          ))}
        </ContentRowWrapper>
        <ButtonWrapper justify="between">
          <ShowResults showResultsFrom={showResultsFrom} showResultsTo={showResultsTo} numberOfItems={numberOfItems} />
          {numberOfItems > itemsPerPage && (
            <Pagination numberOfItems={numberOfItems} />
          )}
        </ButtonWrapper>
      </ContentWrapper>
    </>
  );
};

export default Bookings;

import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SingleBooking from "src/components/layout/SingleBooking";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import ButtonWrapper from "src/components/layout/ButtonWrapper";
import PageButton from "src/components/common/PageButton";
import {
  bookingsSortOptions,
  bookingsTabs,
  itemsPerPage,
} from "src/utils/constants";
import { useEffect, useState } from "react";
import { BookingType } from "src/types/types";
import { useSearchParams } from "react-router-dom";
import { fetchBookings } from "src/api/BookingsApi";
import ShowResults from "src/components/layout/ShowResults";

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfBookings, setNumberOfBookings] = useState<number>(0);
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "All";
  const sortValue = searchParams.get("sort") || "date (upcoming first)";
  useEffect(() => {
    const fetchAndSetBookings = async () => {
      try {
        setLoading(true);
        const { data, count } = await fetchBookings(
          filterValue,
          sortValue,
          pageNumber
        );
        setNumberOfBookings(count);
        setBookings(data as BookingType[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetBookings();
  }, [filterValue, sortValue, pageNumber]);

  const from = (pageNumber - 1) * 10 + 1;
  const to = from + 10 - 1;

  const nextPage = () => {
    if (pageNumber <= numberOfBookings / itemsPerPage) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HeadingContainer title="All bookings">
        <SearchFilterTab
          tabOptions={bookingsTabs}
          sortOptions={bookingsSortOptions}
          setPageNumber={setPageNumber}
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
        {numberOfBookings > itemsPerPage && (
          <ButtonWrapper justify="between">
            <ShowResults
              from={from}
              to={to}
              numberOfBookings={numberOfBookings}
            />
            <div className="flex gap-4">
              <PageButton
                isDisabled={pageNumber === 1 ? true : false}
                direction="previous"
                clickHandler={previousPage}
              />
              <PageButton
                isDisabled={
                  pageNumber > numberOfBookings / itemsPerPage ? true : false
                }
                direction="next"
                clickHandler={nextPage}
              />
            </div>
          </ButtonWrapper>
        )}
      </ContentWrapper>
    </>
  );
};

export default Bookings;

import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import { bookingsSortOptions } from "src/utils/constants";
import { useState } from "react";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SingleBooking from "src/components/layout/SingleBooking";

const Bookings = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const bookingTabs = [
    {
      text: "All",
      clickHandler: (index: number) => {
        setActiveIndex(index);
      },
    },
    {
      text: "Checked out",
      clickHandler: (index: number) => {
        setActiveIndex(index);
      },
    },
    {
      text: "Checked in",
      clickHandler: (index: number) => {
        setActiveIndex(index);
      },
    },
    {
      text: "Unconfirmed",
      clickHandler: (index: number) => {
        setActiveIndex(index);
      },
    },
  ];

  return (
    <>
      <HeadingContainer title="All bookings">
        <SearchFilterTab
          tabOptions={bookingTabs}
          sortOptions={bookingsSortOptions}
          activeIndex={activeIndex}
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
          <SingleBooking status="checkedIn"/>
          <SingleBooking status="checkedOut"/>
          <SingleBooking status="unconfirmed"/>
          <SingleBooking status="unconfirmed"/>
          <SingleBooking status="checkedOut"/>
        </ContentRowWrapper>
      </ContentWrapper>
    </>
  );
};

export default Bookings;

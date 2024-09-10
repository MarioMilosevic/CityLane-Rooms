import SearchFilterTab from "src/components/common/SearchFilterTab";
import HeadingContainer from "src/components/layout/HeadingContainer";
import { bookingsSortOptions } from "src/utils/constants";
import { useState } from "react";

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
    </>
  );
};

export default Bookings;

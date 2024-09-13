import { useSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";
import FilterButton from "./FilterButton";
import { FilterProps } from "src/types/types";

const Filter = ({ options }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {pathname} = useLocation();

  const handleClick = (value: string, index: number) => {
    if (pathname === '/bookings') {
      searchParams.set("status", value);
    } else if (pathname === '/rooms') {
      searchParams.set("discount", value);
    }
    setSearchParams(searchParams);
    setActiveIndex(index);
  };

  return (
    <>
      {options.map((option, index) => (
        <FilterButton
          key={index}
          text={option}
          color={activeIndex === index ? "yellow" : "neutral"}
          buttonHandler={() => handleClick(option, index)}
        />
      ))}
    </>
  );
};

export default Filter;

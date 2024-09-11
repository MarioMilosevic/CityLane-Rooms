import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import FilterButton from "./common/FilterButton";

const Filter = ({ options }: { options: string[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (value: string, index: number) => {
    searchParams.set("discount", value);
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

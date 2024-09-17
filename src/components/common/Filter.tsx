import { useSearchParams, useLocation } from "react-router-dom";
import { FilterProps } from "src/types/types";
import FilterButton from "./FilterButton";

const Filter = ({ options }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  let filterValue: string;
  if (pathname === "/bookings") {
    filterValue = searchParams.get("status") || "All";
  } else if (pathname === "/rooms") {
    filterValue = searchParams.get("discount") || "All";
  }

  const handleClick = (value: string) => {
    if (pathname === "/bookings") {
      searchParams.set("status", value);
    } else if (pathname === "/rooms") {
      searchParams.set("discount", value);
    }
    searchParams.set('page', "1")
    setSearchParams(searchParams);
  };

  return (
    <>
      {options.map((option, index) => (
        <FilterButton
          key={index}
          text={option}
          color={filterValue === option ? "yellow" : "neutral"}
          buttonHandler={() => handleClick(option)}
        />
      ))}
    </>
  );
};

export default Filter;

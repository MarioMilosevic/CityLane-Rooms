import { FilterTabColors, FilterTabProps } from "../../types/types";

const FilterButton = ({text, color, buttonHandler }: FilterTabProps) => {
  const filterTabColors: FilterTabColors = {
    neutral: "bg-neutral-50 text-neutral-950",
    yellow:"bg-yellow-500 text-yellow-50"
  };

  return (
    <button
      className={`px-2 py-1 rounded-md transition duration-300 ${filterTabColors[color]}`}
      onClick={buttonHandler}
    >
      {text}
    </button>
  );
};

export default FilterButton;

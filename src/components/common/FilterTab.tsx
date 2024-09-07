import { FilterTabColors, FilterTabProps } from "../../types/types";

const FilterTab = ({text, color, buttonHandler }: FilterTabProps) => {
  const filterTabColors: FilterTabColors = {
    blue: "bg-sky-600 text-sky-100",
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

export default FilterTab;

import { FilterTabColors, FilterTabProps } from "../../utils/types";

const FilterTab = ({ children, color, buttonHandler }: FilterTabProps) => {
  const filterTabColors: FilterTabColors = {
    blue: "bg-sky-600 text-sky-100",
    neutral: "bg-neutral-50 text-neutral-950",
  };

  return (
    <button
      className={`px-2 py-1 rounded-md transition duration-300 ${filterTabColors[color]}`}
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
};

export default FilterTab;

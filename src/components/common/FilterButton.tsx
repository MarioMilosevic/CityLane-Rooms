import { FilterButtonColors, FilterButtonProps } from "../../types/types";

const FilterButton = ({ text, color, buttonHandler }: FilterButtonProps) => {
  const filterTabColors: FilterButtonColors = {
    neutral: "bg-neutral-50 text-neutral-950 dark:bg-slate-500 dark:text-slate-50",
    yellow: "bg-yellow-500 text-yellow-50",
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

import { FilterButtonColors, FilterButtonProps } from "../../types/types";

const FilterButton = ({ text, color, buttonHandler }: FilterButtonProps) => {
  const filterTabColors: FilterButtonColors = {
    neutral:
      "bg-neutral-50 text-neutral-950 dark:bg-slate-500 dark:text-slate-50",
    yellow: "bg-yellow-500 text-yellow-50",
  };

  return (
    <button
      className={`lg:px-2 lg:py-1 px-1 py-0.5 rounded-md transition duration-300 lg:text-base text-sm ${filterTabColors[color]}`}
      onClick={buttonHandler}
    >
      {text}
    </button>
  );
};

export default FilterButton;

import FilterTab from "./FilterTab";
import { useState } from "react";
import SortOption from "./SortOption";
import { SearchFilterTabProps } from "../../utils/types";
const SearchFilterTab = ({tabOptions, sortOptions}:SearchFilterTabProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex items-center gap-2 text-sm">
      {tabOptions.map((tab, index) => (
        <FilterTab
          key={index}
          color={activeIndex === index ? "blue" : "neutral"}
          buttonHandler={() => setActiveIndex(index)}
        >
          {tab}
        </FilterTab>
      ))}
      <select className="px-2 py-1 rounded-md">
        {sortOptions.map((option, index) => <SortOption key={index} {...option} />)}
      </select>
    </div>
  );
}

export default SearchFilterTab

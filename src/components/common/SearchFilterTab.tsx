import FilterTab from "./FilterTab";
import { filterTabs } from "../../utils/constants";
import { useState } from "react";
const SearchFilterTab = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex items-center gap-2 text-sm">
      {filterTabs.map((tab, index) => (
        <FilterTab
          key={index}
          color={activeIndex === index ? "blue" : "neutral"}
          buttonHandler={() => setActiveIndex(index)}
        >
          {tab}
        </FilterTab>
      ))}
      <select className="px-2 py-1 rounded-md">
        <option value="">Sort by name (A-Z)</option>
      </select>
    </div>
  );
}

export default SearchFilterTab

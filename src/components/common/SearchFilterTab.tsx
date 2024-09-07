import FilterTab from "./FilterTab";
import SortOption from "./SortOption";
import { updateRooms } from "../../utils/helpers";

import { SearchFilterTabProps } from "../../types/types";
const SearchFilterTab = ({
  tabOptions,
  sortOptions,
  activeIndex,
  rendered,
  setRendered,
  filterAndSort,
  setFilterAndSort,
}: SearchFilterTabProps) => {
  const sortRendered = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterAndSort((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
    const sorted = updateRooms(rendered, filterAndSort.filter, e.target.value);
    setRendered(sorted);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {tabOptions?.map((tab, index) => (
        <FilterTab
          key={index}
          color={activeIndex === index ? "yellow" : "neutral"}
          buttonHandler={tab.clickHandler}
          text={tab.text}
        />
      ))}
      <select
        className="px-2 py-2 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        onChange={(e) => sortRendered(e)}
      >
        {sortOptions?.map((option, index) => (
          <SortOption key={index} option={option} />
        ))}
      </select>
    </div>
  );
};

export default SearchFilterTab;

import SortOption from "./SortOption";
import { updateRooms } from "../../utils/helpers";

import { SearchFilterTabProps } from "../../types/types";
import Filter from "../Filter";
const SearchFilterTab = ({
  // tabOptions,
  sortOptions,
  // activeIndex,
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
      <Filter options={["All", "With discount", "No discount"]} />
      {/* isto za sort */}
      <select
        className="py-1 px-2 rounded-md bg-neutral-50 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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

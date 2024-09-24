import { SearchFilterTabProps } from "../../types/types";
import Filter from "./Filter";
import Sort from "../layout/Sort";
const SearchFilterTab = ({ tabOptions, sortOptions }: SearchFilterTabProps) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex gap-2 lg:static absolute bottom-0 left-0 justify-between w-full">
        <Filter options={tabOptions} />
      </div>
      <Sort options={sortOptions} />
    </div>
  );
};

export default SearchFilterTab;

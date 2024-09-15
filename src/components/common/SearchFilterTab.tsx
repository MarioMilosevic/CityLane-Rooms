
import { SearchFilterTabProps } from "../../types/types";
import Filter from "./Filter";
import Sort from "../layout/Sort";
const SearchFilterTab = ({
  tabOptions,
  sortOptions,
  setPageNumber
}: SearchFilterTabProps) => {

  return (
    <div className="flex items-center gap-2 text-sm">
      <Filter options={tabOptions} setPageNumber={setPageNumber} />
      <Sort options={sortOptions} />
    </div>
  );
};

export default SearchFilterTab;

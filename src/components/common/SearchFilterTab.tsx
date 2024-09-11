
import { SearchFilterTabProps } from "../../types/types";
import Filter from "./Filter";
import Select from "../layout/Select";
const SearchFilterTab = ({
  tabOptions,
  sortOptions,
}: SearchFilterTabProps) => {

  return (
    <div className="flex items-center gap-2 text-sm">
      <Filter options={tabOptions} />
      <Select options={sortOptions} />
    </div>
  );
};

export default SearchFilterTab;

import { SortOptionType } from "../../types/types";

const SortOption = ({ value, name }: SortOptionType) => {
  return <option value={value}>Sort by {name}</option>;
};

export default SortOption;

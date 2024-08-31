import { SortOptionType } from "../../types/types";

const SortOption = ({ option }: SortOptionType) => {
  return <option value={option}>Sort by {option}</option>;
};

export default SortOption;

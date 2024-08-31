import { SortOptionType } from "../../types/types";

const SortOption = ({ name }: SortOptionType) => {
  return <option value={name}>Sort by {name}</option>;
};

export default SortOption;

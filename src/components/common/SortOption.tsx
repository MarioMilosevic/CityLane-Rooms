import { SortOptionType } from "../../utils/types"

const SortOption = ({value, name}:SortOptionType) => {
  return (
    <option value={value}>
       Sort by {name}
    </option>
  )
}

export default SortOption

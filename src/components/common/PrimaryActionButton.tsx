import { PrimaryActionButtonProps } from "../../utils/types"

const PrimaryActionButton = ({children}:PrimaryActionButtonProps) => {
  return (
    <button className="bg-sky-500 text-sky-100 font-medium text-lg px-4 py-2 rounded-md">
      {children}
    </button>
  )
}

export default PrimaryActionButton

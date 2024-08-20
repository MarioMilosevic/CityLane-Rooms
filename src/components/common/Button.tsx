import { ButtonProps } from "../../utils/types"

const Button = ({children}:ButtonProps) => {
  return (
    <button className="bg-sky-500 text-sky-100 font-medium text-lg px-4 py-2 rounded-md">
      {children}
    </button>
  )
}

export default Button

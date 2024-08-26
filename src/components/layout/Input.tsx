import { InputProps } from "../../utils/types";

const Input = ({name, type, value, changeHandler}:InputProps) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => changeHandler(e)}
      className="w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
    />
  );
}

export default Input

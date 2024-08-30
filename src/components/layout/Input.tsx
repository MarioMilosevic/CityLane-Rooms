import { InputProps } from "../../types/types";

const Input = ({ id, type, value, changeHandler, zod }: InputProps) => {
  const { onChange: zodOnchange, ...restZodProps } = zod;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(e);
    if (zodOnchange) {
      zodOnchange(e);
    }
  };

  const baseClass =
    "w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500";
  return (
    <input
      id={id}
      type={type}
      {...(type !== "file" && { value })}
      value={value}
      onChange={handleChange}
      className={`${baseClass} ${type === "file" && "file_custom"}`}
      {...restZodProps}
    />
  );
};

export default Input;

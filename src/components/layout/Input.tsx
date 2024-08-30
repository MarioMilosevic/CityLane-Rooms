import { InputProps } from "../../types/types";

const Input = ({ id, type, value, changeHandler, zod, error }: InputProps) => {
  const { onChange: zodOnchange, ...restZodProps } = zod;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(e);
    if (zodOnchange) {
      zodOnchange(e);
    }
  };

  const baseClass =
    "w-[400px] p-4 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500";
  return (
    <div className="flex h-full relative">
      <input
        id={id}
        type={type}
        {...(type !== "file" && { value })}
        value={value}
        onChange={handleChange}
        className={`${baseClass} ${type === "file" && "file_custom"}`}
        {...restZodProps}
      />
      {error && (
        <p className="text-red-500 absolute -bottom-[28px] left-0">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;

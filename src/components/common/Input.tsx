import { InputProps } from "../../types/types";

const Input = ({ id, type, zod, error }: InputProps) => {
  const { onChange: zodOnChange, ...restZodProps } = zod || {};

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        onChange={zodOnChange}
        className={`w-full p-1.5 lg:p-3 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-yellow-500 focus:border-none dark:bg-slate-500 dark:border-slate-500 dark:text-neutral-50 ${
          type === "file" && "file_custom"
        }`}
        {...restZodProps}
      />
      {error && (
        <p className="text-red-500 absolute -bottom-6 left-0 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;

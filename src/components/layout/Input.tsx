import { InputProps } from "../../types/types";

const Input = ({ id, type, zod, error }: InputProps) => {
  const { onChange: zodOnChange, ...restZodProps } = zod || {};

  return (
    <div className="relative w-full max-w-xs">
      <input
        id={id}
        type={type}
        onChange={zodOnChange}
        className={`w-full p-3 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500 ${
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

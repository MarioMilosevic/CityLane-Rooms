import React from "react";
import { InputProps } from "../../types/types";

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  changeHandler,
  zod,
  error,
}) => {
  const { onChange: zodOnChange, ...restZodProps } = zod || {};
console.log(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changeHandler) {
      changeHandler(e);
    }
    if (zodOnChange) {
      zodOnChange(e);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        id={id}
        type={type}
        value={type !== "file" ? value : undefined}
        onChange={handleChange}
        className={`w-full p-4 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500 ${
          type === "file" ? "file_custom" : ""
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

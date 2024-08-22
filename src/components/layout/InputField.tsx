import { InputFieldProps } from "../../utils/types";

const InputField = ({ name, type, id }:InputFieldProps) => {
  return (
    <div className="w-full px-4 py-3 border-b border-neutral-200 bg-neutral-100">
      <div className="w-2/3 flex justify-between items-center">
        <label htmlFor={id} className="text-md font-medium w-1/3">
          {name}
        </label>
        <input
          type={type}
          id={id}
          className="w-2/3 p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
        />
      </div>
    </div>
  );
};

export default InputField;

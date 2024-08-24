import { InputFieldProps } from "../../utils/types";

const InputField = ({ name, type }: InputFieldProps) => {
  const id = name.toLowerCase().replace(/ /g, "_")
  return (
    <form className="w-full p-4 border-b border-neutral-200 bg-neutral-50">
      <div className="w-full flex items-center gap-16">
        <label htmlFor={id} className="w-1/4 text-md font-medium">
          {name}
        </label>
        <input
          type={type}
          id={id}
          className="w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
        />
      </div>
    </form>
  );
};

export default InputField;

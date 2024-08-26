import { TextAreaProps } from "../../utils/types";

const TextArea = ({ name, value }:TextAreaProps) => {
  return (
    <textarea
      className="w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
      name={name}
      value={value}
    ></textarea>
  );
};

export default TextArea;

import { TextAreaProps } from "../../types/types";

const TextArea = ({ id, value, changeHandler }: TextAreaProps) => {
  return (
    <>
      <textarea
        className="w-[400px] p-2 rounded-md border outline-none transition-all duration-200 border-neutral-300 focus:outline-sky-500"
        id={id}
        value={value}
        onChange={(e) => changeHandler(e)}
      ></textarea>
    </>
  );
};

export default TextArea;

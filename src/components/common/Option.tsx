import { OptionProps } from "../../types/types";

const Option = ({ clickHandler, text, icon: Icon }: OptionProps) => {
  return (
    <button
      className="flex items-center justify-between gap-4 px-4 py-1 w-full font-medium text-neutral-600 hover:bg-neutral-200"
      onClick={clickHandler}
    >
      {<Icon />}
      <p>{text}</p>
    </button>
  );
};

export default Option;

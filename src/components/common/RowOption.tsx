import { RowOptionProps } from "../../utils/types";

const RowOption = ({ clickHandler, text, icon: Icon }: RowOptionProps) => {
  return (
    <button
      className="flex items-center justify-between gap-4 px-4 py-1 w-full font-medium text-neutral-600"
      onClick={clickHandler}
    >
      {<Icon />}
      <p>{text}</p>
    </button>
  );
};

export default RowOption;

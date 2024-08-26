import { RowOptionProps } from "../../utils/types";

const RowOption = ({ roomId, clickHandler, text, icon: Icon }: RowOptionProps) => {
  const mario = () => [
    clickHandler(roomId)
  ]
  return (
    <button
      className="flex items-center justify-between gap-4 px-4 py-1 w-full font-medium text-neutral-600"
      onClick={() => clickHandler(roomId)}
    >
      {<Icon />}
      <p>{text}</p>
    </button>
  );
};

export default RowOption;

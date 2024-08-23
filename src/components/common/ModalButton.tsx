import { ModalButtonProps } from "../../utils/types";

const ModalButton = ({clickHandler, text, icon }: ModalButtonProps) => {
  return (
    <button
          className="flex items-center justify-between gap-4 px-4 py-1 w-full font-medium text-neutral-600"
          onClick={clickHandler}
    >
      {<icon/>}
          <p>{text}</p>
        </button>
  );
};

export default ModalButton;

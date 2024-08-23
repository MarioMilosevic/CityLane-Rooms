import { ModalButtonProps } from "../../utils/types";

const ModalButton = ({ options }: ModalButtonProps) => {
  return (
    <>
      {options.map((option, index) => (
        <button
          key={index}
          className="flex items-center justify-between gap-4 px-4 py-1 w-full font-medium text-neutral-600"
          onClick={option.clickHandler}
        >
          <option.icon />
          <p>{option.text}</p>
        </button>
      ))}
    </>
  );
};

export default ModalButton;

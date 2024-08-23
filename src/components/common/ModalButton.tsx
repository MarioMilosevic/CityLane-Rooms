import { ModalButtonProps } from "../../utils/types";

const ModalButton = ({ options }: ModalButtonProps) => {
  return (
    <div className="bg-neutral-50 border border-neutral-500 z-10 absolute top-12 right-6 flex flex-col items-center justify-start rounded-md">
      {options.map((option, index) => (
        <button
          key={index}
          className="flex items-center justify-between gap-4 px-4 py-1 w-full"
          onClick={option.clickHandler}
        >
          <option.icon />
          <p>{option.text}</p>
        </button>
      ))}
    </div>
  );
};

export default ModalButton;

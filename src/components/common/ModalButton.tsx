import { ModalButtonProps } from "../../utils/types";

const ModalButton = ({ options }: ModalButtonProps) => {
  const proba = (e) => {
    e.stopPropagation();
    console.log("event");
  };

  return (
    <button
      className="bg-white z-20 absolute top-10 right-0 flex flex-col rounded-md"
      onClick={proba}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 px-4 py-1"
        >
          <option.icon />
          <p>{option.text}</p>
        </div>
      ))}
    </button>
  );
};

export default ModalButton;

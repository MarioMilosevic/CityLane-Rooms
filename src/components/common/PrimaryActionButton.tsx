import { PrimaryActionButtonProps } from "../../types/types";

const PrimaryActionButton = ({
  text,
  color,
  clickHandler,
  disabled,
}: PrimaryActionButtonProps) => {
  const buttonColorOptions = {
    blue: "bg-sky-500 enabled:hover:bg-sky-600 text-sky-100 enabled:hover:text-sky-50",
    white:
      "border border-neutral-400 bg-neutral-50 enabled:hover:bg-neutral-200 text-neutral-800 enabled:hover:text-neutral-900",
  };
  const disabledClass = disabled ? "cursor-not-allowed" : "cursor-pointer";
  return (
    <button
      className={`
       ${buttonColorOptions[color]} mt-8 font-medium text-lg px-4 py-2 rounded-md transition-all duration-200 ${disabledClass}`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryActionButton;

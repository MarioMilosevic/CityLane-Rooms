import { PrimaryActionButtonProps } from "../../utils/types";

const PrimaryActionButton = ({ color, children }: PrimaryActionButtonProps) => {
  const buttonColorOptions = {
    blue: "bg-sky-500 hover:bg-sky-600 text-sky-100 hover:text-sky-50",
    white:
      "border border-neutral-400 bg-neutral-50 hover:bg-neutral-200 text-neutral-800 hover:text-neutral-900",
  };
  return (
    <button
      className={`
       ${buttonColorOptions[color]} font-medium text-lg px-4 py-2 rounded-md transition-all duration-200`}
    >
      {" "}
      {children}
    </button>
  );
};

export default PrimaryActionButton;

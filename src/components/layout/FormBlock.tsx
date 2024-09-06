import { FormBlockProps } from "../../types/types";
const FormBlock = ({ children, size, direction }: FormBlockProps) => {
  const formBlockSizeOptions = {
    small: "px-4 py-4",
    big: "px-4 py-6",
  };

  const formBlockDirectionOptions = {
    column: "flex-col",
    row:"flex-row"
  }

  return (
    <div
      className={`w-full ${formBlockSizeOptions[size]} border border-neutral-200 bg-neutral-50`}
    >
      <div className={`w-full flex ${formBlockDirectionOptions[direction]}`}>{children}</div>
      {/* <div className="w-full flex gap-16 border border-black">{children}</div> */}
    </div>
  );
};

export default FormBlock;

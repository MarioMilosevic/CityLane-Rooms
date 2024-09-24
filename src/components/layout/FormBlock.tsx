import { FormBlockProps } from "../../types/types";
const FormBlock = ({ children, size, direction }: FormBlockProps) => {
  const formBlockSizeOptions = {
    small: "p-4",
    big: "px-4 py-6",
  };

  const formBlockDirectionOptions = {
    column: "flex-col",
    row: "flex-row",
  };

  return (
    <div
      className={`w-full mx-auto ${formBlockSizeOptions[size]}  rounded-lg border border-neutral bg-neutral-50 dark:bg-slate-900 dark:border-slate-500`}
    >
      <div className={`w-full flex ${formBlockDirectionOptions[direction]} `}>
        {children}
      </div>
    </div>
  );
};

export default FormBlock;

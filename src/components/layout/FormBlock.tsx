import { FormBlockProps } from "../../types/types";
const FormBlock = ({ children }: FormBlockProps) => {
  return (
    <div className="w-full px-4 py-6 border border-neutral-200 bg-neutral-50">
      <div className="w-full flex gap-16">
        {children}
      </div>
    </div>
  );
};

export default FormBlock;

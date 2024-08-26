import { FormBlockProps } from "../../utils/types";
const FormBlock = ({ children }: FormBlockProps) => {
  return (
    <div className="w-full p-4 border border-neutral-200 bg-neutral-50">
      <div className="w-full flex items-center gap-16">
       {children}
      </div>
    </div>
  );
};

export default FormBlock;

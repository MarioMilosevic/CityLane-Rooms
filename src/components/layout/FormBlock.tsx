import { FormBlockProps } from "../../types/types";
const FormBlock = ({ children, error }: FormBlockProps) => {
  return (
    <div className="w-full px-4 py-6 border border-neutral-200 bg-neutral-50">
      <div className="w-full flex items-center gap-16 relative">
        {children}
        {error && (
          <p className="text-red-500 absolute  bottom-[-25px] right-[65px]">
            Room name must be 2 or more charachters long
          </p>
        )}
      </div>
    </div>
  );
};

export default FormBlock;

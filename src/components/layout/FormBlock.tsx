import { FormBlockProps } from "../../types/types";
const FormBlock = ({ children, size }: FormBlockProps) => {

  const formBlockSizeOptions = {
    small: "px-2 py-4",
    big:'px-4 py-6',
}

  return (
    <div className={`w-full ${formBlockSizeOptions[size]} border border-neutral-200 bg-neutral-50`}>
      <div className="w-full flex gap-16">
        {children}
      </div>
    </div>
  );
};

export default FormBlock;

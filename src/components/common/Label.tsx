import { LabelProps } from "../../types/types";

const Label = ({ id }: LabelProps) => {
  return (
    <label htmlFor={id} className="flex items-center w-full text-sm lg:text-base font-medium lg:p-2 dark:text-slate-50">
      {id}
    </label>
  );
};

export default Label;

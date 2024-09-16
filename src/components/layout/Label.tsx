import { LabelProps } from "../../types/types";

const Label = ({ id }: LabelProps) => {
  return (
    <label htmlFor={id} className="w-full text-md font-medium p-2 dark:text-slate-50">
      {id}
    </label>
  );
};

export default Label;

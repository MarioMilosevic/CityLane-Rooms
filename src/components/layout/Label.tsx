import { LabelProps } from "../../types/types";

const Label = ({ id }: LabelProps) => {
  return (
    <label htmlFor={id} className="w-1/4 text-md font-medium p-4">
      {id}
    </label>
  );
};

export default Label;

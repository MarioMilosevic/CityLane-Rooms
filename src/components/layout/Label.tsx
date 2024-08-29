import { LabelProps } from "../../types/types";

const Label = ({ name }: LabelProps) => {
  return (
    <label htmlFor={name} className="w-1/4 text-md font-medium">
      {name}
    </label>
  );
};

export default Label;

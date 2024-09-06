import { LabelProps } from "../../types/types";

const Label = ({ id }: LabelProps) => {
  return (
    <label htmlFor={id} className="w-full text-md font-medium p-2">
      {id}
    </label>
  );
};

export default Label;

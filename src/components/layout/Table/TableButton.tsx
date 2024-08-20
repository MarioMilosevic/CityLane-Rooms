import { TableButtonProps } from "../../../utils/types";

const TableButton = ({ children }: TableButtonProps) => {
  return (
      <button className="uppercase text-lg font-medium">{children}</button>
  );
};

export default TableButton;

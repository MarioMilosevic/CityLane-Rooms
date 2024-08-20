import { TableButtonProps } from "../../../utils/types";

const TableButton = ({ children }: TableButtonProps) => {
  return (
    <li>
      <button className="uppercase text-lg font-medium">{children}</button>
    </li>
  );
};

export default TableButton;

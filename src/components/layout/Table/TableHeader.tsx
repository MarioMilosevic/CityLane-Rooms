import { TableHeaderProps } from "../../../utils/types";

const TableHeader = ({ width, children }:TableHeaderProps) => {
  const tableHeaderOptions = {
    small: "w-[10%]",
    medium: "w-[20%]",
    big: "w-[25%]",
  };
  return <div className={`${tableHeaderOptions[width]}`}>{children}</div>;
};

export default TableHeader;

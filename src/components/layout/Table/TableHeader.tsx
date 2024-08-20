import { TableHeaderProps } from "../../../utils/types";
import { tableHeaderOptions } from "../../../utils/constants";
const TableHeader = ({ width, children }: TableHeaderProps) => {
 
  return <div className={`${tableHeaderOptions[width]} py-4`}>{children}</div>;
};

export default TableHeader;

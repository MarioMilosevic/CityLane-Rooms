import { TableHeaderProps } from "../../../utils/types";
import { tableHeaderOptions } from "../../../utils/constants";
const TableHeader = ({ width, title }: TableHeaderProps) => {
  return (
    <div className={`${tableHeaderOptions[width]} py-4`}>
      <span className="uppercase text-lg font-medium">{title}</span>
    </div>
  );
};

export default TableHeader;

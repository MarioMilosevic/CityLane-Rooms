import { TableContainerProps } from "../../../utils/types";

const TableContainer = ({ children }:TableContainerProps) => {
  return <div className="border border-neutral-200 rounded-md mb-8">{children}</div>;
};

export default TableContainer;

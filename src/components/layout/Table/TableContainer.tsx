import { TableContainerProps } from "../../../utils/types";

const TableContainer = ({ children }:TableContainerProps) => {
  return <div className="flex border border-black">{children}</div>;
};

export default TableContainer;

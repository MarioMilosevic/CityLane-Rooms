import { TableContainerProps } from "../../../utils/types";

const TableContainer = ({ children }:TableContainerProps) => {
  return <div className="bg-yellow-500 border border-black">{children}</div>;
};

export default TableContainer;

import { PrimaryActionButtonWrapperProps } from "../../utils/types";

const PrimaryActionButtonWrapper = ({
  children,
}: PrimaryActionButtonWrapperProps) => {
  return (
    <div className="flex items-center justify-end gap-4 py-4">{children}</div>
  );
};

export default PrimaryActionButtonWrapper;

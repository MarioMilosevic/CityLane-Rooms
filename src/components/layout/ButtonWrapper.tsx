import { ButtonWrapperProps } from "../../types/types";

const ButtonWrapper = ({
  children,
}: ButtonWrapperProps) => {
  return (
    <div className="flex items-center justify-end gap-4 py-4">{children}</div>
  );
};

export default ButtonWrapper;

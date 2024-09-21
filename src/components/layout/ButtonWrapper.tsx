import { ButtonWrapperProps } from "../../types/types";

const ButtonWrapper = ({
  children,
  justify
}: ButtonWrapperProps) => {
  const buttonWrapperJustifyOptions = {
    start:"justify-start",
    between:"justify-between",
    end: "justify-end",
  }

  return (
    <div className={`flex items-center ${buttonWrapperJustifyOptions[justify]} gap-4 py-4`}>{children}</div>
  );
};

export default ButtonWrapper;

import { OptionButtonProps } from "../../utils/types";
import { forwardRef, Ref } from "react";
const OptionButton = forwardRef(
  ({ children }: OptionButtonProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        className="bg-neutral-50 border border-neutral-500 z-10 absolute top-10 right-6 flex flex-col items-center justify-start rounded-md"
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default OptionButton;

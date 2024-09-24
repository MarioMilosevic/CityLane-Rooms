import { OptionButtonProps } from "../../types/types";
import { forwardRef, Ref } from "react";
const OptionButton = forwardRef(
  ({ children }: OptionButtonProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        className="bg-neutral-50 border border-neutral-500 z-10 absolute lg:top-10 lg:right-6 top-1/2 translate-y-1/4 right-0 flex flex-col items-center justify-start rounded-md"
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default OptionButton;

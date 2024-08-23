import { ModalProps } from "../../utils/types";
import { forwardRef, Ref } from "react";
const Modal = forwardRef(
  ({ children }: ModalProps, ref: Ref<HTMLDivElement>) => {
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

export default Modal;

import { ModalProps } from "../../utils/types";

const Modal = ({ children }: ModalProps) => {
  return (
    <div className="bg-neutral-50 border border-neutral-500 z-10 absolute top-12 right-6 flex flex-col items-center justify-start rounded-md">
      {children}
    </div>
  );
};

export default Modal;

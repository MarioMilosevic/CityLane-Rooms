import { ModalProps } from "../../utils/types";

const Modal = ({ children }: ModalProps) => {
  return (
    <button className="bg-white z-10 absolute top-12 right-0 flex flex-col rounded-md">
      {children};
    </button>
  );
};

export default Modal;

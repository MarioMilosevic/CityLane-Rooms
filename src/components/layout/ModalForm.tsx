import { ModalFormProps } from "../../utils/types";
import { PiXBold } from "react-icons/pi";
import useClickOutside from "../../hooks/useClickOutside";
const ModalForm = ({ children, closeModal }: ModalFormProps) => {
  const modalRef = useClickOutside<HTMLFormElement>(closeModal);

  return (
    <div className="flex items-center justify-center z-10 fixed top-0 right-0 w-full h-screen backdrop-blur-sm">
      <form
        className="flex flex-col bg-neutral-50  z-20 border px-8 py-4 relative"
        ref={modalRef}
      >
        <PiXBold
          className="absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200"
          onClick={closeModal}
        />
        {children}
      </form>
    </div>
  );
};

export default ModalForm;

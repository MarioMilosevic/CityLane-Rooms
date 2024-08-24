import { ModalFormProps } from "../../utils/types";
import { PiXBold } from "react-icons/pi";
const ModalForm = ({ children, closeModal }: ModalFormProps) => {
  return (
    <div className="flex items-center justify-center z-10 fixed top-0 right-0 w-screen h-screen backdrop-blur-sm">
      <div className="w-1/2 h-1/2 z-20 bg-white border border-black p-4 relative">
        <PiXBold
          className="absolute top-4 right-4 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200"
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
};

export default ModalForm;

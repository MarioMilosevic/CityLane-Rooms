import { ModalFormProps } from "../../utils/types";
import { PiXBold } from "react-icons/pi";
const ModalForm = ({ children, closeModal }: ModalFormProps) => {
  return (
     <div className="flex items-center justify-center z-10 fixed top-0 right-0 w-full h-screen backdrop-blur-sm">
       <div className="flex flex-col bg-neutral-50 w-1/2 max-h-1/2 z-20 border px-8 py-4 relative">
      {/* <div className="flex flex-col bg-neutral-50  z-20 border px-8 py-4 relative"> */}
        <PiXBold
          className="absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200"
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
};

export default ModalForm;

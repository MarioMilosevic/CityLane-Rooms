import PrimaryActionButton from "../common/PrimaryActionButton";
import ButtonWrapper from "./ButtonWrapper";
import Title from "../common/Title";
import { PiXBold } from "react-icons/pi";
// import { deleteBooking } from "src/api/BookingsApi";
import { DeleteBookingModalProps } from "src/types/types";
import useClickOutside from "src/hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

const DeleteBookingModal = ({
  closeModal,
    deleteHandler
}: DeleteBookingModalProps) => {
  const modalRef = useClickOutside<HTMLFormElement>(closeModal);
  const navigate = useNavigate();

  const onDelete = () => {
        deleteHandler()
      closeModal();
    navigate("/bookings");
  };
  

  return (
    <div className="flex items-center justify-center z-10 fixed top-0 right-0 w-full h-screen backdrop-blur-sm">
      <form
        className="max-h-[80vh] flex flex-col gap-8 bg-neutral-50 dark:bg-slate-600 z-20 border px-8 py-8 relative"
        ref={modalRef}
      >
        <PiXBold
          className="absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200 dark:text-slate-200 dark:hover:border-neutral-50 dark:hover:border"
          onClick={closeModal}
        />
        <Title title="Delete booking" position="left" />
        <p>
          Are you sure you want to delete this booking permanently? <br /> This
          action cannot be undone.
        </p>
        <ButtonWrapper justify="end">
          <PrimaryActionButton
            text="Cancel"
            color="white"
            clickHandler={closeModal}
          />
          <PrimaryActionButton
            text="Delete"
            color="red"
            clickHandler={onDelete}
          />
        </ButtonWrapper>
      </form>
    </div>
  );
};

export default DeleteBookingModal;

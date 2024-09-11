import { ContentRowProps } from "../../types/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { showToast } from "src/utils/toast";
import { createPortal } from "react-dom";
import { deleteRoomFromServer } from "src/api/RoomsApi";
import useClickOutside from "../../hooks/useClickOutside";
import OptionButton from "./OptionButton";
import RowOption from "../common/RowOption";
import ModalForm from "./ModalForm";
import Amount from "../common/Amount";
import { formatPrice } from "src/utils/helpers";

const SingleRoom = ({
  room,
  setRooms,
}: ContentRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);

  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsModalOpen(false),
    isModalOpen
  );
  const { image, name, regularPrice, discount, capacity } = room;

  const deleteRoom = (roomId: number) => {
    setRooms((prev) => prev.filter((room) => room.id !== roomId));
  };

  const deleteHandler = async (roomId: number) => {
    try {
      const response = await deleteRoomFromServer(roomId);
      if (response) {
        deleteRoom(roomId);
        showToast("Room deleted sucessfully", "success");
      }
    } catch (error) {
      showToast("Error deleting room");
      console.error("Error deleting room :", error);
    }
  };

  const openModal = async () => {
    setIsModalFormOpen(true);
  };

  return (
    <li className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center h-[60px] bg-neutral-50 relative">
      <div className="h-[60px]">
        <img
          src={image as string}
          alt={image as string}
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <h3 className="text-lg font-medium">{name}</h3>
      <p>Fits up to {capacity} guests</p>
      <Amount value={regularPrice} type="price" />
      <div className="font-medium relative flex items-center justify-between pr-6">
        {discount ? (
          <h4 className="text-green-500">{`$${formatPrice(discount)}`}</h4>
        ) : (
          <h4 className="line-through text-neutral-500">{`$${formatPrice(
            regularPrice
          )}`}</h4>
        )}
        <button
          className="cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <BsThreeDotsVertical className="h-5 w-5" />
        </button>

        {isModalOpen && (
          <OptionButton ref={modalRef}>
            <RowOption
              text="Edit"
              icon={MdModeEditOutline}
              clickHandler={openModal}
            />
            <RowOption
              text="Delete"
              icon={MdDelete}
              clickHandler={() => deleteHandler(room.id)}
            />
          </OptionButton>
        )}
      </div>
      {isModalFormOpen &&
        createPortal(
          <ModalForm
            room={room}
            setRooms={setRooms}
            setIsModalFormOpen={setIsModalFormOpen}
          />,
          document.body
        )}
    </li>
  );
};

export default SingleRoom;

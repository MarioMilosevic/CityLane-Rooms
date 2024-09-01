import { ContentRowProps } from "../../types/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import useClickOutside from "../../hooks/useClickOutside";
import OptionButton from "./OptionButton";
import RowOption from "../common/RowOption";
import ModalForm from "./ModalForm";
import { createPortal } from "react-dom";
import { showToast } from "../../services/toastNotification";
import { deleteRoomFromServer } from "../../services/RoomsApi";

const ContentRow = ({ room,rooms, setRooms, setRenderedRooms }: ContentRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);

  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsModalOpen(false),
    isModalOpen
  );
  const { image, name, regularPrice, discount, capacity } = room;

const deleteRoom = (roomId: number) => {
  setRooms(rooms.filter((room) => room.id !== roomId));
  setRenderedRooms(rooms.filter((room) => room.id !== roomId));
};

  const deleteHandler = async (roomId: number) => {
    console.log(roomId)
    try {
      const response = await deleteRoomFromServer(roomId);
      if (response[0]) {
        deleteRoom(roomId);
        showToast("Room deleted successfully", "success");
      }
    } catch (error) {
      showToast("Error deleting room");
      console.error("Error deleting room :", error);
    }
  };

  return (
    <li className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center h-[60px] bg-neutral-50 relative">
      <div className="h-[60px]">
        <img
          src={image}
          alt={image}
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <h3 className="text-lg font-medium">{name}</h3>
      <p>Fits up to {capacity} guests</p>
      <h4 className="font-medium">{`$${regularPrice}.00`}</h4>

      <div className="font-medium relative flex items-center justify-between pr-6">
        {discount ? (
          <h4 className="text-green-500">{`$${discount}.00`}</h4>
        ) : (
          <h4 className="line-through text-neutral-500">{`$${regularPrice}.00`}</h4>
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
              clickHandler={() => setIsModalFormOpen(true)}
            />
            <RowOption
              text="Delete"
              icon={MdDelete}
              // clickHandler={() => console.log("treba da izbrise sobu")}
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
            setRenderedRooms={setRenderedRooms}
            setIsModalFormOpen={setIsModalFormOpen}
          />,
          document.body
        )}
    </li>
  );
};

export default ContentRow;
// {isModalFormOpen &&
//   createPortal(
//     <ModalForm
//       isModalFormOpen={isModalFormOpen}
//       setIsModalFormOpen={setIsModalFormOpen}
//       setRooms={setRooms}
//       setRenderedRooms={setRenderedRooms}
//       isEditing={false}
//     />,
//     document.body
//   )}

import { ContentRowProps } from "../../types/types";
import { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { showToast } from "src/utils/toast";
import { createPortal } from "react-dom";
import { deleteRoomFromServer } from "src/api/RoomsApi";
import { formatPrice } from "src/utils/helpers";
import useClickOutside from "../../hooks/useClickOutside";
import OptionButton from "../common/OptionButton";
import Option from "../common/Option";
import RoomsModal from "./RoomsModal";
import Amount from "../common/Amount";
import OpenModalOptions from "./OpenModalOptions";

const SingleRoom = ({ room, setRooms, setNumberOfRooms }: ContentRowProps) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [isRoomsModalOpen, setIsRoomsModalOpen] = useState<boolean>(false);

  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsOptionsModalOpen(false),
    isOptionsModalOpen
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
        setNumberOfRooms((prev) => prev - 1);
        showToast("Room deleted sucessfully");
      }
    } catch (error) {
      showToast("Error deleting room", 'error');
      console.error("Error deleting room :", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-[2fr_5fr_5fr_4fr_4fr] place-content-center lg:gap-6  items-center  grid-cols-[1fr_2fr_2fr_2fr_2fr] gap-1 h-[60px] bg-neutral-50 relative dark:bg-slate-500 mb-1">
      <div className="h-[60px] justify-self-start w-full">
        <img
          src={image as string}
          alt={image as string}
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <h3 className="lg:text-lg text-sm font-medium justify-self-start">
        {name}
      </h3>
      <p className="lg:text-base text-xs">Fits up to {capacity} guests</p>
      <Amount value={regularPrice} type="price" position="start" />
      <div className="font-medium relative flex items-center justify-between lg:text-base text-xs">
        {discount ? (
          <h4 className="text-green-500">{`$${formatPrice(discount)}`}</h4>
        ) : (
          <h4 className="line-through text-neutral-500 dark:text-slate-300">{`$${formatPrice(
            regularPrice
          )}`}</h4>
        )}
      </div>
      <OpenModalOptions
        clickHandler={() => setIsOptionsModalOpen((prev) => !prev)}
      />
      {isOptionsModalOpen && (
        <OptionButton ref={modalRef}>
          <Option
            text="Edit"
            icon={MdModeEditOutline}
            clickHandler={() => setIsRoomsModalOpen(true)}
          />
          <Option
            text="Delete"
            icon={MdDelete}
            clickHandler={() => deleteHandler(room.id)}
          />
        </OptionButton>
      )}
      {isRoomsModalOpen &&
        createPortal(
          <RoomsModal
            room={room}
            setRooms={setRooms}
            setIsRoomsModalOpen={setIsRoomsModalOpen}
            setNumberOfRooms={setNumberOfRooms}
          />,
          document.body
        )}
    </div>
  );
};

export default SingleRoom;

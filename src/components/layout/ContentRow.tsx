import { ContentRowProps } from "../../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalButton from "../common/ModalButton";
import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Modal from "./Modal";

const ContentRow = ({ room, options }: ContentRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsModalOpen(false),
    isModalOpen
  );
  const { image, name, regularPrice, discount, capacity } = room;

  const modalButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen((prev) => !prev);
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
      <p className="">Fits up to {capacity} guests</p>
      <h4 className="font-medium">{`$${regularPrice}.00`}</h4>

      <div className="font-medium relative flex items-center justify-between pr-6">
        {discount ? (
          <h4 className="text-green-500">{`$${discount}.00`}</h4>
        ) : (
          <h4 className="line-through text-neutral-500">{`$${regularPrice}.00`}</h4>
        )}
        <button
          className="cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={modalButtonHandler}
        >
          <BsThreeDotsVertical className="h-5 w-5" />
        </button>

        {isModalOpen && (
          <Modal ref={modalRef}>
            {options.map((option, index) => (
              <ModalButton key={index} {...option} />
            ))}
          </Modal>
        )}
      </div>
    </li>
  );
};

export default ContentRow;

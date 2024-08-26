import { ContentRowProps } from "../../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import RowOption from "../common/RowOption";
import OptionButton from "./OptionButton";

const ContentRow = ({ room, options }: ContentRowProps) => {
  // napraviti pojedinacne arraye koji ce svaki objekat da ima svoju funkciju, 
  // napraviti poseban folder API u kojem ce da budu sve funkcije pojedinacno
  // importovati ih u constants dje su mi arrayevi i dodijeliti odgovarajucem njegovu funkciju
  // odje importat sve te arrayeve koji mogu da se renderuju
  // nekako preko propsa odrediti koji ce da se renderuje
  // svakoj komponenti proslijediti id kao parametar 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useClickOutside<HTMLDivElement>(
    () => setIsModalOpen(false),
    isModalOpen
  );
  const { id, image, name, regularPrice, discount, capacity } = room;


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
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <BsThreeDotsVertical className="h-5 w-5" />
        </button>

        {isModalOpen && (
          <OptionButton ref={modalRef}>
            {options.map((option, index) => (
              <RowOption key={index} {...option} roomId={id } />
            ))}
          </OptionButton>
        )}
      </div>
    </li>
  );
};

export default ContentRow;

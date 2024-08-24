import { ContentRowProps } from "../../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalButton from "../common/ModalButton";
import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Modal from "./Modal";

const ContentRow = ({ room, options }: ContentRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { image, name, regularPrice, discount, capacity } = room;

  const modalRef = useClickOutside(() => setIsModalOpen(false), isModalOpen);

  return (
    <div className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6 items-center h-[60px] bg-neutral-50 relative">
      <div className="h-[60px]">
        <img
          src={image}
          alt={image}
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <div className="text-lg font-medium">{name}</div>
      <div className="">Fits up to {capacity} guests</div>
      <div className="font-semibold">{`$${regularPrice}.00`}</div>

      <div className="font-semibold relative flex items-center justify-between pr-6">
        {discount ? (
          <span className="text-green-500">{`$${discount}.00`}</span>
        ) : (
          <span className="line-through text-neutral-500">{`$${regularPrice}.00`}</span>
        )}
        <button
          className="cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={() => setIsModalOpen((prev) => !prev)}
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
    </div>
  );
};

export default ContentRow;

/*

 <div className="flex gap-6 items-center h-[60px] bg-neutral-50 relative">
   <div className="w-[10%] h-full">
     <img
       src={image}
       alt={image}
       className="object-cover w-full h-full rounded-sm"
     />
   </div>
   <div className="text-lg font-medium w-[25%]">{name}</div>
   <div className="w-[25%]">Fits up to {capacity} guests</div>
   <div className="w-[20%] font-semibold">{`$${regularPrice}.00`}</div>

   <div className="w-[20%] font-semibold relative flex items-center justify-between pr-6">
     {discount ? (
       <span className="text-green-500">{`$${discount}.00`}</span>
     ) : (
       <span className="line-through text-neutral-500">{`$${regularPrice}.00`}</span>
     )}
     <button
       className="cursor-pointer w-8 h-8 flex items-center justify-center"
       onClick={() => setIsModalOpen((prev) => !prev)}
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
</div>;
 */
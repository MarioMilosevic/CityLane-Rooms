// import { TableRowProps } from "../../../utils/types";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import ModalButton from "../../common/ModalButton";
// import { useState } from "react";
// import useClickOutside from "../../../hooks/useClickOutside";
// const TableRow = ({ room, options }: TableRowProps) => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const { image, name, regularPrice, discount, capacity } = room;

//   const domNode = useClickOutside(() => setIsModalOpen(false));

//   return (
//     <div className="flex gap-6 items-center h-[60px] bg-neutral-50 relative">
//       <div className="w-[10%] h-full">
//         <img
//           src={image}
//           alt={image}
//           className="object-cover w-full h-full rounded-sm"
//         />
//       </div>
//       <div className="text-lg font-medium w-[25%]">{name}</div>
//       <div className="w-[25%]">Fits up to {capacity} guests</div>
//       <div className="w-[20%] font-semibold">{`$${regularPrice}.00`}</div>

//       <div
//         className="w-[20%] font-semibold relative flex items-center justify-between pr-6 border border-black"
//         ref={domNode}
//         // here it works
//       >
//         {discount ? (
//           <span className="text-green-500">{`$${discount}.00`}</span>
//         ) : (
//           <span className="line-through text-neutral-500">{`$${regularPrice}.00`}</span>
//         )}
//         <div
//           className="4 cursor pointer w-8 h-8 flex items-center justify-center border border-black"
//           onClick={() => setIsModalOpen((prev) => !prev)}
//           ref={domNode}
//           // i want it here, but it doesn't work
//         >
//           <BsThreeDotsVertical className="h-5 w-5 cursor-pointer" />
//         </div>
       
//       </div>
//       {isModalOpen && <ModalButton options={options} />}
//     </div>
//   );
// };

// export default TableRow;



// export default TableRow;

import { TableRowProps } from "../../../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalButton from "../../common/ModalButton";
import { useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

const TableRow = ({ room, options }: TableRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { image, name, regularPrice, discount, capacity } = room;

  const modalRef = useClickOutside(() => setIsModalOpen(false));

  return (
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
        <div
          className="cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <BsThreeDotsVertical className="h-5 w-5" />
        </div>

        {isModalOpen && (
          <div ref={modalRef}>
            <ModalButton options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableRow;


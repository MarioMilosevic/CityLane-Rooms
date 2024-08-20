import { TableRowProps } from "../../../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";
const TableRow = ({ room }: TableRowProps) => {
  const { image, name, regularPrice, discount, capacity } = room;

  return (
    <div className="flex gap-6 items-center h-[60px] bg-neutral-50">
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
      <div className="w-[20%] font-semibold relative">
        {discount ? (
          <span className="text-green-500">{`$${discount}.00`}</span>
        ) : (
          <span className="line-through text-neutral-500">{`$${regularPrice}.00`}</span>
        )}
        <BsThreeDotsVertical className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-4 w-4 h-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default TableRow;

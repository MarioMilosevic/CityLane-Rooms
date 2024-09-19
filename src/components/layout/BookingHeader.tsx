import { BookingHeaderProps } from "src/types/types";
import Title from "../common/Title";
import Status from "./Status";
import { BiArrowBack } from "react-icons/bi";

const BookingHeader = ({ status, goBack, title }: BookingHeaderProps) => {

  return (
    <div className="flex justify-between items-center py-8">
      <div className="flex gap-4">
        <Title title={title} position="left" />
        <Status status={status as string} />
      </div>
      <button onClick={goBack} className="flex items-center gap-2">
        <BiArrowBack size={22} />
        <span className="font-medium">Back</span>
      </button>
    </div>
  );
}

export default BookingHeader

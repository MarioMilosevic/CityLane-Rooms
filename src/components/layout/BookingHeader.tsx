import { BookingHeaderProps, StatusOptions } from "src/types/types";
import { BiArrowBack } from "react-icons/bi";
import Title from "../common/Title";
import Status from "./Status";

const BookingHeader = ({ status, goBack, title }: BookingHeaderProps) => {

  return (
    <div className="flex justify-between items-center py-8">
      <div className="flex gap-4">
        <Title title={title} position="left" />
        <Status status={status as keyof StatusOptions} />
      </div>
      <button onClick={goBack} className="flex items-center gap-2">
        <BiArrowBack className="lg:text-xl text-base"/>
        <span className="font-medium lg:text-base text-sm">Back</span>
      </button>
    </div>
  );
}

export default BookingHeader

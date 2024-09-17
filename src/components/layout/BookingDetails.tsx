import { useParams } from "react-router-dom";
import Status from "./Status";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Title from "../common/Title";
const BookingDetails = () => {
  const { bookingId } = useParams();
  console.log(bookingId);

  return (
    <div className="border border-black min-h-[50vh] flex flex-col">
      <header className="flex justify-between items-center py-4">
        <div className="flex gap-4">
          <Title title={`Booking #${bookingId}`} />
          <Status status="Checked in" />
        </div>
        <Link to={"/bookings"} className="flex items-center gap-2">
          <IoArrowBackCircle size={22} />
          <span className="font-medium">Back</span>
        </Link>
      </header>
    </div>
  );
};

export default BookingDetails;

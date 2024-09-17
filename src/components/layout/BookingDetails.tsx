import { useParams } from "react-router-dom";
import Status from "./Status";
import { IoArrowBackCircle } from "react-icons/io5";
import { PiHouseLineBold } from "react-icons/pi";
import { BiMessageDetail } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from "react-router-dom";
import Title from "../common/Title";
const BookingDetails = () => {
  const { bookingId } = useParams();
  console.log(bookingId);

  return (
    <div className="min-h-[50vh] flex flex-col">
      <div className="flex justify-between items-center py-8">
        <div className="flex gap-4">
          <Title title={`Booking #${bookingId}`} />
          <Status status="Checked in" />
        </div>
        <Link to={"/bookings"} className="flex items-center gap-2">
          <IoArrowBackCircle size={22} />
          <span className="font-medium">Back</span>
        </Link>
      </div>
      <section className="">
        <header className="p-4 flex items-center justify-between bg-yellow-600 text-yellow-100">
          <div className="flex items-center gap-4">
            <PiHouseLineBold size={30} />
            <p>2 nights in Cabin 003 </p>
          </div>
          <p>Mon, May 29 2023 (over 1 year ago) — Wed, May 31 2023</p>
        </header>
        <section className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-lg">Maria Rodriguez + 2 guests</h2>
            <h3 className="font-light">• maria@gmail.com •</h3>
            <h4 className="font-light">National ID 1098765321</h4>
          </div>
          <div className="flex items-center gap-2">
            <BiMessageDetail />
            <h2>Observations</h2>
            <h3 className="font-light">We will be bringing our small dog with us</h3>
          </div>
          <div className="flex items-center gap-2 pb-8">
            <CiCircleCheck />
            <h2>Breakfast included?</h2>
            <h3 className="font-light">No</h3>
          </div>
          <div className="border border-black flex justify-between items-center bg-green-300 text-green-900 p-4">
            <div className="flex items-center gap-2">
              <AiFillDollarCircle size={22} />
              <h3>Total price</h3>
              <span>$600.00</span>
            </div>
            <span>PAID</span>
          </div>
        </section>
        <footer className="text-sm flex justify-end px-4">
          Booked Mon, May 29 2023, 12:46 PM
        </footer>
      </section>
    </div>
  );
};

export default BookingDetails;

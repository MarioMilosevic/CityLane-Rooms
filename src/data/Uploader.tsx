import PrimaryActionButton from "src/components/common/PrimaryActionButton";
import { uploadAll, uploadBookings } from "src/api/HelperApi";

const Uploader = () => {
  return (
    <div className="p-4 text-center flex flex-col gap-4">
      <h3>SAMPLE DATA</h3>
      <PrimaryActionButton
        color="yellow"
        text="Upload ALL"
        clickHandler={uploadAll}
      />
      <PrimaryActionButton
        color="yellow"
        text="Upload bookings ONLY"
        clickHandler={uploadBookings}
      />
    </div>
  );
}

export default Uploader;

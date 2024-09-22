import PrimaryActionButton from "src/components/common/PrimaryActionButton";
import {  uploadBookings } from "src/api/HelperApi";

const Uploader = () => {
  return (
    <PrimaryActionButton
      color="yellow"
      text="Upload"
      clickHandler={uploadBookings}
    />
  );
};

export default Uploader;

import PrimaryActionButton from "src/components/common/PrimaryActionButton";
import { uploadBookings } from "src/utils/helpers";

const Uploader = () => {
  return (
    <PrimaryActionButton
      color="yellow"
      text="Reupload"
      clickHandler={uploadBookings}
    />
  );
};

export default Uploader;

import PrimaryActionButton from "src/components/common/PrimaryActionButton";
import { uploadAll } from "src/api/HelperApi";

const Uploader = () => {
  return (
    <PrimaryActionButton
      color="yellow"
      text="Upload ALL"
      clickHandler={uploadAll}
    />
  );
};

export default Uploader;

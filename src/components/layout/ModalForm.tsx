import { ModalFormProps } from "../../utils/types";
import { PiXBold } from "react-icons/pi";
import useClickOutside from "../../hooks/useClickOutside";
import FormBlock from "./FormBlock";
import Label from "./Label";
import Input from "./Input";
import TextArea from "./TextArea";
import PrimaryActionButton from "../common/PrimaryActionButton";
import PrimaryActionButtonWrapper from "./PrimaryActionButtonWrapper";
import { createNewRoom } from "../../utils/api";
import { showToast } from "../../utils/toastNotification";
import { useDispatch } from "react-redux";
import { addRoom } from "../../redux/features/roomsSlice";

const ModalForm = ({
  setIsModalOpen,
  singleRoom,
  setSingleRoom,
  isEditing
}: ModalFormProps) => {
  console.log(singleRoom);
  const modalRef = useClickOutside<HTMLFormElement>(() =>
    setIsModalOpen(false)
  );
  const dispatch = useDispatch();
  console.log("isEditing", isEditing);

  const addNewRoom = async () => {
    try {
      const data = await createNewRoom(singleRoom);
      dispatch(addRoom(data[0]));
      showToast("Room created successfully!", "success");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating new room:", error);
      showToast("Unable to create new room. Please try again later.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center z-10 fixed top-0 right-0 w-full h-screen backdrop-blur-sm">
      <form
        className="flex flex-col bg-neutral-50 z-20 border px-8 py-4 relative"
        ref={modalRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <PiXBold
          className="absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200"
          onClick={() => setIsModalOpen(false)}
        />
        <FormBlock>
          <Label name={"Room name"} />
          <Input
            name={"Room name"}
            value={singleRoom.name}
            type="text"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </FormBlock>
        <FormBlock>
          <Label name={"Maximum capacity"} />
          <Input
            name={"Maximum capacity"}
            value={singleRoom.capacity}
            type="number"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({
                ...prev,
                capacity: e.target.value,
              }))
            }
          />
        </FormBlock>
        <FormBlock>
          <Label name={"Regular price"} />
          <Input
            name={"Regular price"}
            value={singleRoom.regularPrice}
            type="number"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({
                ...prev,
                regularPrice: e.target.value,
              }))
            }
          />
        </FormBlock>
        <FormBlock>
          <Label name={"Discount"} />
          <Input
            name={"Discount"}
            value={singleRoom.discount}
            type="number"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({
                ...prev,
                discount: e.target.value,
              }))
            }
          />
        </FormBlock>
        <FormBlock>
          <Label name={"Description for website"} />
          <TextArea
            name={"Description for website"}
            value={singleRoom.description}
            changeHandler={(e) =>
              setSingleRoom((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </FormBlock>
        <FormBlock>
          <Label name={"Room photo"} />
          <Input
            name={"Room photo"}
            value=""
            type="file"
            changeHandler={(e) => console.log(e)}
          />
        </FormBlock>
        <PrimaryActionButtonWrapper>
          <PrimaryActionButton
            text="Cancel"
            clickHandler={() => setIsModalOpen(false)}
            color="white"
          />
          <PrimaryActionButton
            text={`${isEditing ? "Edit room" : "Create new room"}`}
            clickHandler={
              isEditing ? () => console.log("funkcija za EDIT") : addNewRoom
            }
            color="blue"
          />
        </PrimaryActionButtonWrapper>
      </form>
    </div>
  );
};

export default ModalForm;

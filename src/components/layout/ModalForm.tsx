import { ModalFormProps } from "../../types/types";
import { PiXBold } from "react-icons/pi";
import { createNewRoom } from "../../services/RoomsApi";
import { showToast } from "../../services/toastNotification";
import { uploadImage } from "../../services/RoomsApi";
import { RoomType } from "../../types/types";
import useClickOutside from "../../hooks/useClickOutside";
import FormBlock from "./FormBlock";
import Label from "./Label";
import Input from "./Input";
import TextArea from "./TextArea";
import PrimaryActionButton from "../common/PrimaryActionButton";
import PrimaryActionButtonWrapper from "./PrimaryActionButtonWrapper";
import { newRoomSchema, newRoomValues } from "../../validation/newRoomSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ModalForm = ({
  setIsModalOpen,
  singleRoom,
  setSingleRoom,
  isEditing,
  setRooms,
}: ModalFormProps) => {
  const modalRef = useClickOutside<HTMLFormElement>(() =>
    setIsModalOpen(false)
  );

  const form = useForm<newRoomValues>({
    defaultValues: {
      roomName: "",
      maximumCapacity: "0",
      regularPrice: "0",
      discount: "0",
      description: "",
    },
    resolver: zodResolver(newRoomSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const addRoom = (newRoom: RoomType) => {
    setRooms((prev) => [...prev, newRoom]);
  };

  const onSubmit = async () => {
    try {
      let newRoom;

      if (singleRoom.image instanceof File) {
        const imageUrl = await uploadImage(singleRoom.image);
        newRoom = { ...singleRoom, image: imageUrl };
      } else {
        newRoom = singleRoom;
      }

      const data = await createNewRoom(newRoom);
      addRoom(data[0]);
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <PiXBold
          className="absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200"
          onClick={() => setIsModalOpen(false)}
        />
        <FormBlock>
          <Label id={"Room name"} />
          <Input
            id={"Room name"}
            value={singleRoom.name}
            type="text"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({ ...prev, name: e.target.value }))
            }
            zod={{ ...register("roomName") }}
            error={errors.roomName}
          />
        </FormBlock>
        <FormBlock>
          <Label id={"Maximum capacity"} />
          <Input
            id={"Maximum capacity"}
            value={singleRoom.capacity}
            type="number"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({
                ...prev,
                capacity: e.target.value,
              }))
            }
            zod={{ ...register("maximumCapacity") }}
            error={errors.maximumCapacity}
          />
        </FormBlock>
        <FormBlock>
          <Label id={"Regular price"} />
          <Input
            id={"Regular price"}
            value={singleRoom.regularPrice}
            type="number"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({
                ...prev,
                regularPrice: e.target.value,
              }))
            }
            zod={{ ...register("regularPrice") }}
            error={errors.regularPrice}
          />
        </FormBlock>
        <FormBlock>
          <Label id={"Discount"} />
          <Input
            id={"Discount"}
            value={singleRoom.discount}
            type="number"
            changeHandler={(e) =>
              setSingleRoom((prev) => ({
                ...prev,
                discount: e.target.value,
              }))
            }
            zod={{ ...register("discount") }}
            error={errors.discount}
          />
        </FormBlock>
        <FormBlock>
          <Label id={"Description for website"} />
          <TextArea
            id={"Description for website"}
            value={singleRoom.description}
            changeHandler={(e) => {
              setSingleRoom((prev) => ({
                ...prev,
                description: e.target.value,
              }));
              // setValue("description", e.target.value); // Update form value
            }}
            zod={{ ...register("description") }}
            error={errors.description}
          />
        </FormBlock>
        <FormBlock>
          <Label id={"Room photo"} />
          <Input
            id={"Room photo"}
            type="file"
            changeHandler={(e) => {
              const fileList = e.target.files;
              if (fileList && fileList.length > 0) {
                setSingleRoom((prev) => ({ ...prev, image: fileList[0] }));
              }
            }}
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
              isEditing
                ? () => console.log("funkcija za EDIT")
                : handleSubmit(onSubmit)
            }
            color="blue"
          />
        </PrimaryActionButtonWrapper>
      </form>
    </div>
  );
};

export default ModalForm;

// if (singleRoom.image instanceof File) {
//   const imageUrl = await uploadImage(singleRoom.image);
//   const newRoom = {
//     ...singleRoom,
//     image: imageUrl,
//   };
//   setIsModalOpen(false);
//   setSingleRoom(newRoom);
//   const data = await createNewRoom(newRoom);
//   addRoom(data[0]);
//   showToast("Room created successfully!", "success");
// }

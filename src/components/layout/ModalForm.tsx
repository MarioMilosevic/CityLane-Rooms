import { useState } from "react";
import { ModalFormProps } from "../../types/types";
import { PiXBold } from "react-icons/pi";
import { createNewRoom, editRoomServer } from "src/features/rooms/services/RoomsApi";
import { showToast } from "src/utils/toast";
import { uploadImage } from "src/features/rooms/services/RoomsApi";
import { RoomType } from "../../types/types";
import { newRoomSchema, newRoomValues } from "src/features/rooms/validation/newRoomSchema";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRooms } from "../../utils/helpers";
import useClickOutside from "../../hooks/useClickOutside";
import FormBlock from "./FormBlock";
import Label from "./Label";
import Input from "./Input";
import TextArea from "./TextArea";
import PrimaryActionButton from "../common/PrimaryActionButton";
import PrimaryActionButtonWrapper from "./PrimaryActionButtonWrapper";

const ModalForm = ({
  room,
  filterAndSort,
  setIsModalFormOpen,
  setRooms,
  setRenderedRooms,
}: ModalFormProps) => {
  const modalRef = useClickOutside<HTMLFormElement>(() =>
    setIsModalFormOpen(false)
  );
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const isEditingSession = room ? true : false;

  const form = useForm<newRoomValues>({
    defaultValues: {
      name: room?.name || undefined,
      capacity: room?.capacity || undefined,
      regularPrice: room?.regularPrice || undefined,
      discount: room?.discount || undefined,
      description: room?.description || undefined,
      image: room?.image || undefined,
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
    setRenderedRooms((prev) => [...prev, newRoom]);
  };

  const addNewRoom = async (formData: RoomType) => {
    try {
      setIsButtonLoading(true);
      const imageFile = formData.image[0];
      const imageUrl = await uploadImage(imageFile as File);
      const newRoom = { ...formData, image: imageUrl as string };
      const data = await createNewRoom(newRoom);
      addRoom(data);
      showToast("Room created successfully!", "success");
    } catch (error) {
      console.error("Error creating new room:", error);
      showToast("Unable to create new room. Please try again later.", "error");
    } finally {
      setIsButtonLoading(false);
      setIsModalFormOpen(false);
    }
  };

  const editRoom = (roomId: number, updatedRoom: RoomType) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomId ? updatedRoom : room))
    );
    setRenderedRooms((prev) => {
      const newRooms = prev.map((room) =>
        room.id === roomId ? updatedRoom : room
      );
      const updatedRooms = updateRooms(
        newRooms,
        filterAndSort?.filter as string,
        filterAndSort?.sort as string
      );
      return updatedRooms;
    });
  };

  const editCurrentRoom = async (formData: RoomType) => {
    if (room) {
      try {
        setIsButtonLoading(true);
        const response = await editRoomServer(room.id, {
          ...formData,
          image: formData.image,
        });
        if (response) {
          editRoom(room.id, response);
        }
      } catch (error) {
        console.error("Error occured: ", error);
      } finally {
        setIsButtonLoading(false);
        setIsModalFormOpen(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center z-10 fixed top-0 right-0 w-full h-screen backdrop-blur-sm">
      <form
        className="overflow-scroll w-[800px] max-h-[80vh] flex flex-col bg-neutral-50 z-20 border px-8 py-8 relative"
        ref={modalRef}
        onSubmit={handleSubmit(isEditingSession ? editCurrentRoom : addNewRoom)}
      >
        <PiXBold
          className="absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] p-1 hover:border hover:border-neutral-500 transition-all duration-200"
          onClick={() => setIsModalFormOpen(false)}
        />
        <FormBlock size="big" direction="row">
          <Label id="Room name" />
          <Input
            id="Room name"
            type="text"
            zod={{ ...register("name") }}
            error={errors.name}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Maximum capacity" />
          <Input
            id="Maximum capacity"
            type="number"
            zod={{ ...register("capacity") }}
            error={errors.capacity}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id={"Regular price"} />
          <Input
            id={"Regular price"}
            type="number"
            zod={{ ...register("regularPrice") }}
            error={errors.regularPrice}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Discount" />
          <Input
            id="Discount"
            type="number"
            zod={{ ...register("discount") }}
            error={errors.discount}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Description for website" />
          <TextArea
            id="Description for website"
            zod={{ ...register("description") }}
            error={errors.description}
          />
        </FormBlock>
        <FormBlock size="big" direction="row">
          <Label id="Room photo" />
          <Input
            id="Room photo"
            type="file"
            zod={{ ...register("image") }}
            error={errors.image as FieldError}
          />
        </FormBlock>
        <PrimaryActionButtonWrapper>
          <PrimaryActionButton
            text="Cancel"
            clickHandler={() => setIsModalFormOpen(false)}
            color="white"
          />
          <PrimaryActionButton
            text={`${isEditingSession ? "Edit room" : "Create new room"}`}
            type="submit"
            color="yellow"
            isLoading={isButtonLoading}
          />
        </PrimaryActionButtonWrapper>
      </form>
    </div>
  );
};

export default ModalForm;

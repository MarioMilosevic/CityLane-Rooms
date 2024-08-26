import {
  roomsTabs,
  roomsSortOptions,
  initialSingleRoomState,
} from "../utils/constants";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useRoomsSlice } from "../hooks/useRoomsSlice";
import { HiDocumentDuplicate } from "react-icons/hi";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import TextArea from "../components/layout/TextArea";
import ContentWrapper from "../components/layout/ContentWrapper";
import ContentHeader from "../components/layout/ContentHeader";
import ContentRow from "../components/layout/ContentRow";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import HeaderContainer from "../components/layout/HeadingContainer";
import ModalForm from "../components/layout/ModalForm";
import FormBlock from "../components/layout/FormBlock";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
import RowOption from "../components/common/RowOption";
import { RoomType } from "../utils/types";
import { showToast } from "../utils/toastNotification";
import { deleteRoomFromServer } from "../utils/api";
import { deleteRoom } from "../redux/features/roomsSlice";
import { useDispatch } from "react-redux";

const Rooms = () => {
  const { rooms } = useRoomsSlice();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [singleRoom, setSingleRoom] = useState<RoomType>(
    initialSingleRoomState
  );
  const dispatch = useDispatch();

  const editHandler = async (roomId: number) => {
    try {
      const room = rooms.find((room) => room.id === roomId);
      if (room) {
        setSingleRoom(room);
        setIsModalOpen(true);
      }
    } catch (error) {
      showToast("Error fetching room data");
      console.error("Error fetching single room: ", error);
    }
  };

  const deleteHandler = async (roomId: number) => {
    try {
      console.log(roomId);
      const response = await deleteRoomFromServer(roomId);
      if (response[0]) {
        dispatch(deleteRoom(roomId));
        showToast("Room deleted successfully", "success");
      }
    } catch (error) {
      showToast("Error deleting room");
      console.error("Error deleting room :", error);
    }
  };

  const addNewRoomHandler = () => {
    setIsModalOpen(true);
    setSingleRoom(initialSingleRoomState);
  };

  return (
    <>
      <HeaderContainer
        title="All rooms"
        isVisible={true}
        tabOptions={roomsTabs}
        sortOptions={roomsSortOptions}
      />
      <ContentWrapper>
        <div className="grid grid-cols-[2fr_5fr_5fr_4fr_4fr] gap-6">
          <ContentHeader title="" />
          <ContentHeader title="Room" />
          <ContentHeader title="Capacity" />
          <ContentHeader title="Price" />
          <ContentHeader title="Discount" />
        </div>
        <ul className="flex flex-col gap-1">
          {rooms.map((room) => (
            <ContentRow key={room.id} room={room}>
              <RowOption
                text="Duplicate"
                icon={HiDocumentDuplicate}
                clickHandler={() => console.log("duplicate je iz ROOMSA")}
              />
              <RowOption
                text="Edit"
                icon={MdModeEditOutline}
                clickHandler={() => editHandler(room.id)}
              />
              <RowOption
                text="Delete"
                icon={MdDelete}
                clickHandler={() => deleteHandler(room.id)}
              />
            </ContentRow>
          ))}
        </ul>
        <PrimaryActionButton
          text="Add new room"
          color="blue"
          clickHandler={addNewRoomHandler}
        />
      </ContentWrapper>
      {isModalOpen &&
        createPortal(
          <ModalForm closeModal={() => setIsModalOpen(false)}>
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
              <Label name={"Regular price"} />
              <Input
                name={"Regular price"}
                value={singleRoom.regularPrice}
                type="number"
                changeHandler={(e) =>
                  setSingleRoom((prev) => ({
                    ...prev,
                    regularPrice: Number(e.target.value),
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
            <div className="flex items-center justify-end gap-4 py-4">
              <PrimaryActionButton
                text="Cancel"
                clickHandler={() => setIsModalOpen(false)}
                color="white"
              />
              <PrimaryActionButton
                text="Create new cabin"
                clickHandler={() => console.log("kasnije")}
                color="blue"
              />
            </div>
          </ModalForm>,
          document.body
        )}
    </>
  );
};

export default Rooms;

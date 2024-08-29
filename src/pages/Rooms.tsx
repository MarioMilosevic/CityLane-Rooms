import {
  roomsTabs,
  roomsSortOptions,
  initialSingleRoomState,
} from "../utils/constants";
import { createPortal } from "react-dom";
import { useState } from "react";
import { HiDocumentDuplicate } from "react-icons/hi";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { NewRoomType, RoomType } from "../types/types";
import { showToast } from "../services/toastNotification";
import { deleteRoomFromServer } from "../services/RoomsApi";
import ContentWrapper from "../components/layout/ContentWrapper";
import ContentHeader from "../components/layout/ContentHeader";
import ContentRow from "../components/layout/ContentRow";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import HeaderContainer from "../components/layout/HeadingContainer";
import ModalForm from "../components/layout/ModalForm";
import RowOption from "../components/common/RowOption";
import ContentHeaderWrapper from "../components/layout/ContentHeaderWrapper";
import ContentRowWrapper from "../components/layout/ContentRowWrapper";
import useFetchRooms from "../hooks/useFetchRooms";

const Rooms = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useFetchRooms(setRooms);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [singleRoom, setSingleRoom] = useState<NewRoomType>(
    initialSingleRoomState
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const deleteRoom = (roomId: number) =>
    setRooms(rooms.filter((room) => room.id !== roomId));

  const editHandler = async (roomId: number) => {
    try {
      const room = rooms.find((room) => room.id === roomId);
      if (room) {
        setSingleRoom(room);
        setIsModalOpen(true);
        setIsEditing(true);
      }
    } catch (error) {
      showToast("Unexpected error occured, please try again later", "error");
      console.error("Error fetching single room: ", error);
    }
  };

  const deleteHandler = async (roomId: number) => {
    try {
      const response = await deleteRoomFromServer(roomId);
      if (response[0]) {
        deleteRoom(roomId);
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
    setIsEditing(false);
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
        <ContentHeaderWrapper>
          <ContentHeader title="" />
          <ContentHeader title="Room" />
          <ContentHeader title="Capacity" />
          <ContentHeader title="Price" />
          <ContentHeader title="Discount" />
        </ContentHeaderWrapper>
        <ContentRowWrapper>
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
        </ContentRowWrapper>
        <PrimaryActionButton
          text="Add new room"
          color="blue"
          clickHandler={addNewRoomHandler}
        />
      </ContentWrapper>
      {isModalOpen &&
        createPortal(
          <ModalForm
            singleRoom={singleRoom}
            setIsModalOpen={setIsModalOpen}
            setSingleRoom={setSingleRoom}
            isEditing={isEditing}
            setRooms={setRooms}
          />,
          document.body
        )}
    </>
  );
};

export default Rooms;

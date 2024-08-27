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
import ContentWrapper from "../components/layout/ContentWrapper";
import ContentHeader from "../components/layout/ContentHeader";
import ContentRow from "../components/layout/ContentRow";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import HeaderContainer from "../components/layout/HeadingContainer";
import ModalForm from "../components/layout/ModalForm";
import RowOption from "../components/common/RowOption";
import { RoomType } from "../utils/types";
import { showToast } from "../utils/toastNotification";
import { deleteRoomFromServer } from "../utils/api";
import { deleteRoom } from "../redux/features/roomsSlice";
import { useDispatch } from "react-redux";
import ContentHeaderWrapper from "../components/layout/ContentHeaderWrapper";
import ContentRowWrapper from "../components/layout/ContentRowWrapper";

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
      showToast("Unexpected error occured, please try again later", "error");
      console.error("Error fetching single room: ", error);
    }
  };

  const deleteHandler = async (roomId: number) => {
    try {
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
          />,
          document.body
        )}
    </>
  );
};

export default Rooms;

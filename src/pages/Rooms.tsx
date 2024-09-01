import { roomsSortOptions } from "../utils/constants";
import { createPortal } from "react-dom";
import { useState } from "react";
import { updateRooms } from "../utils/helpers";
import { RoomType } from "../types/types";
import { showToast } from "../services/toastNotification";
import { deleteRoomFromServer } from "../services/RoomsApi";
import ContentWrapper from "../components/layout/ContentWrapper";
import ContentHeader from "../components/layout/ContentHeader";
import ContentRow from "../components/layout/ContentRow";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import HeaderContainer from "../components/layout/HeadingContainer";
import ModalForm from "../components/layout/ModalForm";
import ContentHeaderWrapper from "../components/layout/ContentHeaderWrapper";
import ContentRowWrapper from "../components/layout/ContentRowWrapper";
import useFetchRooms from "../hooks/useFetchRooms";
import SearchFilterTab from "../components/common/SearchFilterTab";

const Rooms = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [renderedRooms, setRenderedRooms] = useState<RoomType[]>([]);
  useFetchRooms(setRooms, setRenderedRooms);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);
  const [filterAndSort, setFilterAndSort] = useState({
    filter: "All",
    sort: "name (A-Z)",
  });

  const roomsTabs = [
    {
      text: "All",
      clickHandler: () => {
        setActiveIndex(0);
        const filteredRooms = updateRooms(rooms, "All", filterAndSort.sort);
        setFilterAndSort((prev) => ({
          ...prev,
          filter: "All",
        }));
        setRenderedRooms(filteredRooms);
      },
    },
    {
      text: "No discount",
      clickHandler: () => {
        setActiveIndex(1);
        const filteredRooms = updateRooms(
          rooms,
          "No discount",
          filterAndSort.sort
        );
        setFilterAndSort((prev) => ({
          ...prev,
          filter: "No discount",
        }));
        setRenderedRooms(filteredRooms);
      },
    },
    {
      text: "With discount",
      clickHandler: () => {
        setActiveIndex(2);
        const filteredRooms = updateRooms(
          rooms,
          "With discount",
          filterAndSort.sort
        );
        setFilterAndSort((prev) => ({
          ...prev,
          filter: "With discount",
        }));
        setRenderedRooms(filteredRooms);
      },
    },
  ];

  const deleteRoom = (roomId: number) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
    setRenderedRooms(rooms.filter((room) => room.id !== roomId));
  };


  // const deleteHandler = async (roomId: number) => {
  //   try {
  //     const response = await deleteRoomFromServer(roomId);
  //     if (response[0]) {
  //       deleteRoom(roomId);
  //       showToast("Room deleted successfully", "success");
  //     }
  //   } catch (error) {
  //     showToast("Error deleting room");
  //     console.error("Error deleting room :", error);
  //   }
  // };

  return (
    <>
      <HeaderContainer title="All rooms">
        <SearchFilterTab
          tabOptions={roomsTabs}
          sortOptions={roomsSortOptions}
          activeIndex={activeIndex}
          rendered={renderedRooms}
          setRendered={setRenderedRooms}
          filterAndSort={filterAndSort}
          setFilterAndSort={setFilterAndSort}
        />
      </HeaderContainer>
      <ContentWrapper>
        <ContentHeaderWrapper>
          <ContentHeader title="" />
          <ContentHeader title="Room" />
          <ContentHeader title="Capacity" />
          <ContentHeader title="Price" />
          <ContentHeader title="Discount" />
        </ContentHeaderWrapper>
        <ContentRowWrapper>
          {renderedRooms.map((room) => (
            <ContentRow
              key={room.id}
              room={room}
              setRooms={setRooms}
              setRenderedRooms={setRenderedRooms}
              isModalFormOpen={isModalFormOpen}
              setIsModalFormOpen={setIsModalFormOpen}
            >
            </ContentRow>
          ))}
        </ContentRowWrapper>
        <PrimaryActionButton
          text="Add new room"
          color="blue"
          clickHandler={() => setIsModalFormOpen(true)}
        />
      </ContentWrapper>
      {isModalFormOpen &&
        createPortal(
          <ModalForm
            isModalFormOpen={isModalFormOpen}
            setIsModalFormOpen={setIsModalFormOpen}
            setRooms={setRooms}
            setRenderedRooms={setRenderedRooms}
          />,
          document.body
        )}
    </>
  );
};

export default Rooms;

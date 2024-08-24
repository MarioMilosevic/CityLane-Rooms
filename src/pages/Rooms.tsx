import { bookingsTabs, roomsSortOptions } from "../utils/constants";
import { createPortal } from "react-dom";
import { useState } from "react";
import ContentWrapper from "../components/layout/ContentWrapper";
import ContentHeader from "../components/layout/ContentHeader";
import ContentRow from "../components/layout/ContentRow";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import { useRoomsSlice } from "../hooks/useRoomsSlice";
import HeaderContainer from "../components/layout/HeadingContainer";
import { roomsOptions } from "../utils/constants";
import ModalForm from "../components/layout/ModalForm";
const Rooms = () => {
  const { rooms } = useRoomsSlice();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <HeaderContainer
        title="All rooms"
        isVisible={true}
        tabOptions={bookingsTabs}
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
            <ContentRow key={room.id} room={room} options={roomsOptions} />
          ))}
        </ul>
      </ContentWrapper>
      <PrimaryActionButton
        color="blue"
        clickHandler={() => setIsModalOpen(true)}
      >
        Add new room
      </PrimaryActionButton>
      {isModalOpen &&
        createPortal(<ModalForm closeModal={() => setIsModalOpen(false) }>Ovo je neki portal</ModalForm>, document.body)}
    </>
  );
};

export default Rooms;

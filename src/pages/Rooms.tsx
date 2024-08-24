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
import InputField from "../components/layout/InputField";
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
        text="Add new room"
        color="blue"
        clickHandler={() => setIsModalOpen(true)}
      />
      {isModalOpen &&
        createPortal(
          <ModalForm closeModal={() => setIsModalOpen(false)}>
            <InputField type="number" name="Room name" />
            <InputField type="number" name="Maximum capacity" />
            <InputField type="number" name="Regular price" />
            <InputField type="number" name="Discount" />
            <InputField type="textarea" name="Description for website" />
            <InputField type="file" name="Room photo" />
            <div className="flex justify-end gap-4">
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

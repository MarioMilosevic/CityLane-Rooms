import { roomsTabs, roomsSortOptions } from "../utils/constants";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useRoomsSlice } from "../hooks/useRoomsSlice";
import { roomsOptions } from "../utils/constants";
import ContentWrapper from "../components/layout/ContentWrapper";
import ContentHeader from "../components/layout/ContentHeader";
import ContentRow from "../components/layout/ContentRow";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import HeaderContainer from "../components/layout/HeadingContainer";
import ModalForm from "../components/layout/ModalForm";
import FormBlock from "../components/layout/FormBlock";
import Label from "../components/layout/Label";
import Input from "../components/layout/Input";
const Rooms = () => {
  const { rooms } = useRoomsSlice();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
            <FormBlock>
              <Label name="Room name"/>
              <Input type="number" name="Room name"/>
            </FormBlock>
            <FormBlock>
              <Label name="Regular price"/>
              <Input type="number" name="Regular price"/>
            </FormBlock>
            <FormBlock>
              <Label name="Description for website"/>
              <Input type="textarea" name="Description for website"/>
            </FormBlock>
            <FormBlock>
              <Label name="Room photo"/>
              <Input type="file" name="Room photo"/>
            </FormBlock>
            {/* <FormBlock type="number" name="Room name" /> */}
            {/* <FormBlock type="numbescription for websitee="Maximum capacity" />
            <FormBlock type="number" name="Regular price" />
            <FormBlock type="number" name="Discount" />
            <FormBlock type="textarea" name="Description for website" />
            <FormBlock type="file" name="Room photo" /> */}
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

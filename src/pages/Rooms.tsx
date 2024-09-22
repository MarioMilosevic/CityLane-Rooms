import { roomsSortOptions, roomsTabs, itemsPerPage } from "src/utils/constants";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllRooms } from "src/api/RoomsApi";
import { RoomType } from "src/types/types";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import SingleRoom from "src/components/layout/SingleRoom";
import PrimaryActionButton from "src/components/common/PrimaryActionButton";
import HeaderContainer from "src/components/layout/HeadingContainer";
import ModalForm from "src/components/layout/ModalForm";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import SearchFilterTab from "src/components/common/SearchFilterTab";
import LoadingSpinner from "src/components/common/LoadingSpinner";
import ButtonWrapper from "src/components/layout/ButtonWrapper";
import ShowResults from "src/components/layout/ShowResults";
import Pagination from "src/components/layout/Pagination";
import useFetchData from "src/hooks/useFetchData";

const Rooms = () => {
  const [searchParams] = useSearchParams();
  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);
  const {
    data: rooms,
    loading,
    setData: setRooms,
    numberOfItems: numberOfRooms,
  } = useFetchData("rooms", fetchAllRooms);
  const currentPage = Number(searchParams.get("page")) || 1;

  const showResultsFrom = (currentPage - 1) * itemsPerPage + 1; // 1 , 11 ,21, 31...
  let showResultsTo = showResultsFrom + itemsPerPage - 1; // 10,20,30,40...
  if (showResultsTo > numberOfRooms) {
    showResultsTo = numberOfRooms;
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HeaderContainer title="All rooms">
        <SearchFilterTab
          tabOptions={roomsTabs}
          sortOptions={roomsSortOptions}
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
          {rooms.map((room) => (
            <SingleRoom
              key={room.id}
              room={room as RoomType}
              setRooms={
                setRooms as React.Dispatch<React.SetStateAction<RoomType[]>>
              }
            ></SingleRoom>
          ))}
        </ContentRowWrapper>
        <ButtonWrapper justify="between">
          <ShowResults
            showResultsFrom={showResultsFrom}
            showResultsTo={showResultsTo}
            numberOfItems={numberOfRooms}
          />
          {numberOfRooms > itemsPerPage && (
            <Pagination numberOfItems={numberOfRooms} />
          )}
        </ButtonWrapper>
        <PrimaryActionButton
          text="Add new room"
          color="yellow"
          clickHandler={() => setIsModalFormOpen(true)}
        />
      </ContentWrapper>
      {isModalFormOpen &&
        createPortal(
          <ModalForm
            setIsModalFormOpen={setIsModalFormOpen}
            setRooms={
              setRooms as React.Dispatch<React.SetStateAction<RoomType[]>>
            }
          />,
          document.body
        )}
    </>
  );
};

export default Rooms;

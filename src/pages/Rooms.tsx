import { roomsSortOptions, roomsTabs } from "src/utils/constants";
import { createPortal } from "react-dom";
import { useState } from "react";
import { RoomType } from "src/types/types";
import ContentWrapper from "src/components/layout/ContentWrapper";
import ContentHeader from "src/components/layout/ContentHeader";
import SingleRoom from "src/components/layout/SingleRoom";
import PrimaryActionButton from "src/components/common/PrimaryActionButton";
import HeaderContainer from "src/components/layout/HeadingContainer";
import ModalForm from "src/components/layout/ModalForm";
import ContentHeaderWrapper from "src/components/layout/ContentHeaderWrapper";
import ContentRowWrapper from "src/components/layout/ContentRowWrapper";
import useFetchData from "src/hooks/useFetchData";
import SearchFilterTab from "src/components/common/SearchFilterTab";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { fetchAllRooms } from "src/api/RoomsApi";
const Rooms = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const loading = useFetchData(setRooms, fetchAllRooms);
  const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "All";
  const sortValue = searchParams.get("sort") || "name (A-Z)";

  let displayedRooms;

  displayedRooms = rooms.filter((room) => {
    if (filterValue === "With discount") {
      return room.discount > 0;
    } else if (filterValue === "No discount") {
      return room.discount === 0;
    } else if (filterValue === "All") {
      return rooms;
    }
  });

  displayedRooms = displayedRooms.sort((a, b) => {
    if (sortValue === "name (A-Z)") {
      return a.name.localeCompare(b.name);
    }
    if (sortValue === "name (Z-A)") {
      return b.name.localeCompare(a.name);
    }
    if (sortValue === "price (low first)") {
      return Number(a.regularPrice) - Number(b.regularPrice);
    }
    if (sortValue === "price (high first)") {
      return Number(b.regularPrice) - Number(a.regularPrice);
    }
    if (sortValue === "capacity (low first)") {
      return Number(a.capacity) - Number(b.capacity);
    }
    if (sortValue === "capacity (high first)") {
      return Number(b.capacity) - Number(a.capacity);
    }
    return 0;
  });

  if (loading) return <LoadingSpinner />;

  return (
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
          {displayedRooms.map((room) => (
            <SingleRoom
              key={room.id}
              room={room}
              setRooms={setRooms}
            ></SingleRoom>
          ))}
        </ContentRowWrapper>
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
            setRooms={setRooms}
          />,
          document.body
        )}
    </>
  );
};

export default Rooms;

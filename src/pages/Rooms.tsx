import {
  bookingsTabs,
  tableHeaders,
  roomsSortOptions,
} from "../utils/constants";
import TableContainer from "../components/layout/Table/TableContainer";
import TableHeader from "../components/layout/Table/TableHeader";
import TableRow from "../components/layout/Table/TableRow";
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import { useRoomsSlice } from "../hooks/useRoomsSlice";
import HeaderContainer from "../components/layout/HeadingContainer";
import { roomsOptions } from "../utils/constants";
const Rooms = () => {
  const { rooms } = useRoomsSlice();
  return (
    <>
      <HeaderContainer
        title="All rooms"
        isVisible={true}
        tabOptions={bookingsTabs}
        sortOptions={roomsSortOptions}
      />
      <TableContainer>
        <div className="flex gap-6">
          {tableHeaders.map((header, index) => (
            <TableHeader key={index} {...header} />
          ))}
        </div>
        <ul className="flex flex-col gap-1">
          {rooms.map((room) => (
            <TableRow key={room.id} room={room} options={roomsOptions} />
          ))}
        </ul>
      </TableContainer>
      <PrimaryActionButton color="blue">Add new room</PrimaryActionButton>
    </>
  );
};

export default Rooms;

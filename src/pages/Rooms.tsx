import { bookingsTabs, tableHeaders, roomsSortOptions } from "../utils/constants";
import TableContainer from "../components/layout/Table/TableContainer";
import TableHeader from "../components/layout/Table/TableHeader";
import TableRow from "../components/layout/Table/TableRow";
import Button from "../components/common/Button";
import { useRoomsSlice } from "../hooks/useRoomsSlice";
import HeaderContainer from "../components/layout/HeaderContainer";
const Rooms = () => {
  const { rooms } = useRoomsSlice();
  return (
    <>
      <HeaderContainer isVisible={true} tabOptions={bookingsTabs} sortOptions={roomsSortOptions}/>
      <TableContainer>
        <div className="flex gap-6">
          {tableHeaders.map((header, index) => (
            <TableHeader key={index} {...header}/>
          ))}
        </div>
        <ul className="flex flex-col gap-1">
          {rooms.map((room) => (
            <TableRow key={room.id} room={room} />
          ))}
        </ul>
      </TableContainer>
      <Button>Add new room</Button>
    </>
  );
};

export default Rooms;

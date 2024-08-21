import FilterTab from "../components/common/FilterTab";
import { filterTabs, tableHeaders } from "../utils/constants";
import { useState } from "react";
import TableContainer from "../components/layout/Table/TableContainer";
import TableHeader from "../components/layout/Table/TableHeader";
import TableRow from "../components/layout/Table/TableRow";
import TableButton from "../components/layout/Table/TableButton";
import Button from "../components/common/Button";
import { useRoomsSlice } from "../hooks/useRoomsSlice";
import Title from "../components/common/Title";
import HeaderContainer from "../components/layout/HeaderContainer";
const Bookings = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { rooms } = useRoomsSlice();
  return (
    <>
      <HeaderContainer isVisible={true} />
      <TableContainer>
        <div className="flex gap-6">
          {tableHeaders.map((header, index) => (
            <TableHeader key={index} width={header.width}>
              <TableButton>{header.title}</TableButton>
            </TableHeader>
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

export default Bookings;

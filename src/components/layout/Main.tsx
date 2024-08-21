import FilterTab from "../common/FilterTab";
import { filterTabs, tableHeaders } from "../../utils/constants";
import { useState } from "react";
import TableContainer from "./Table/TableContainer";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import TableButton from "./Table/TableButton";
import Button from "../common/Button";
import { useRoomsSlice } from "../../hooks/useRoomsSlice";
import Title from "../common/Title";
const Main = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {rooms} = useRoomsSlice()
  return (
    <>
      <div className="flex justify-between py-8">
        <Title title="All rooms"/>
        <div className="flex items-center gap-2 text-sm">
          {filterTabs.map((tab, index) => (
            <FilterTab
            key={index}
            color={activeIndex === index ? "blue" : "neutral"}
            buttonHandler={() => setActiveIndex(index)}
            >
              {tab}
            </FilterTab>
          ))}
          <select className="px-2 py-1 rounded-md">
            <option value="">Sort by name (A-Z)</option>
          </select>
        </div>
      </div>
      <TableContainer>
        <div className="flex gap-6">
        {tableHeaders.map((header, index) => (
          <TableHeader key={index} width={header.width}>
            <TableButton>{header.title}</TableButton>
          </TableHeader>
        ))}
        </div>
        <ul className="flex flex-col gap-1">
          {rooms.map((room) => <TableRow key={room.id} room={room } />)}
        </ul>
      </TableContainer>
        <Button>Add new room</Button>
        </>
  );
};

export default Main;

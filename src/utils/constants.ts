import { IoHomeOutline, IoSettingsSharp } from "react-icons/io5";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { MdLocalHotel } from "react-icons/md";
import { TableHeader } from "./types";

export const initialRoomsState = []

export const links = [
  { heading: "Home", icon: IoHomeOutline },
  { heading: "Bookings", icon: FaRegCalendarAlt },
  { heading: "Rooms", icon: MdLocalHotel },
  { heading: "Users", icon: FaUsers },
  { heading: "Settings", icon: IoSettingsSharp },
];

export const filterTabs = ["All", "No discount", "With discount"];

export const tableHeaders: TableHeader[] = [
  { title: "", width: "small" },
  { title: "Room", width: "big" },
  { title: "Capacity", width: "big" },
  { title: "Price", width: "medium" },
  { title: "Discount", width: "medium" },
];

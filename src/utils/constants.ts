import { IoSettingsSharp } from "react-icons/io5";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { MdLocalHotel, MdDelete, MdModeEditOutline } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";

export const initialRoomsState = [];

export const links = [
  { heading: "bookings", icon: FaRegCalendarAlt },
  { heading: "rooms", icon: MdLocalHotel },
  { heading: "users", icon: FaUsers },
  { heading: "settings", icon: IoSettingsSharp },
];

// Bookings
export const bookingsTabs = ["All", "Checked out", "Checked in", "Unconfirmed"];

// Rooms
export const roomsFormFields = [
  { name: "Room name", type: "text" },
  { name: "Regular price", type: "number" },
  { name: "Description for website", type: "textarea" },
  { name: "Room photo", type: "file" },
];

export const roomsTabs = ["All", "No discount", "With discount"];
export const roomsSortOptions = [
  {
    name: "name (A-Z)",
    value: "name-asc",
  },
  {
    name: "name (Z-A)",
    value: "name-desc",
  },
  {
    name: "price (low first)",
    value: "name-desc",
  },
  {
    name: "price (high-first)",
    value: "name-asc",
  },
  {
    name: "name (A-Z)",
    value: "name-asc",
  },
  {
    name: "capacity (low-first)",
    value: "capacity-desc",
  },
  {
    name: "capacity (high-first)",
    value: "capacity-asc",
  },
];

export const roomsOptions = [
  {
    icon: HiDocumentDuplicate,
    text: "Duplicate",
    clickHandler: () => console.log("nesto"),
  },
  {
    icon: MdModeEditOutline,
    text: "Edit",
    clickHandler: () => console.log("edit"),
  },
  {
    icon: MdDelete,
    text: "Delete",
    clickHandler: () => console.log("nesto"),
  },
];

// Users

export const usersFormFields = [
  { name: "Full name", type: "text" },
  { name: "Email address", type: "email" },
  { name: "Password (min 8 characters)", type: "password" },
  { name: "Repeat password", type: "password" },
];

// Settings
export const settingsFormFields = [
  { name: "Minimum nights/booking", type: "number" },
  { name: "Maximum nights/booking", type: "number" },
  { name: "Maximum guests/booking", type: "number" },
  { name: "Breakfast price", type: "number" },
];

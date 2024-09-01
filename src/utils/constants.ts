import { IoSettingsSharp } from "react-icons/io5";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { MdLocalHotel } from "react-icons/md";

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

export const roomsSortOptions = [
  "name (A-Z)",
  "name (Z-A)",
  "price (low first)",
  "price (high first)",
  "capacity (low first)",
  "capacity (high first)",
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


import { IoSettingsSharp } from "react-icons/io5";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { MdLocalHotel } from "react-icons/md";

export const initialRoomsState = [];

export const initialSingleRoomState = {
  created_at: "",
  description: "",
  discount: 0,
  id: 0,
  image: "",
  name: "",
  regularPrice: 0,
  capacity: 0,
};

export const links = [
  { heading: "bookings", icon: FaRegCalendarAlt },
  { heading: "rooms", icon: MdLocalHotel },
  { heading: "users", icon: FaUsers },
  { heading: "settings", icon: IoSettingsSharp },
];

// Bookings
export const bookingsTabs = ["All", "Checked out", "Checked in", "Unconfirmed"];

// Rooms

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

// u slucaju da mi nestane rooms
/*

const rooms = []
{capacity
: 
1
created_at
: 
"2024-08-19T10:01:08.878911+00:00"
description
: 
"A cozy single room, perfect for solo travelers. Features a comfortable bed, a work desk, and all the essentials for a pleasant stay."
discount
: 
10
id
: 
1
image
: 
"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Standard Single Room"
regularPrice
: 
75},
{capacity
: 
2
created_at
: 
"2024-08-19T10:02:18.862373+00:00"
description
: 
"A comfortable double room with a queen-size bed, ideal for couples or friends. Enjoy a relaxing atmosphere with modern amenities."
discount
: 
5
id
: 
2
image
: 
"https://images.unsplash.com/photo-1576354302919-96748cb8299e?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Standard Double Room"
regularPrice
: 
95},
{capacity
: 
2
created_at
: 
"2024-08-19T10:06:14.251988+00:00"
description
: 
"A spacious double room with elegant decor and upgraded amenities. Perfect for those seeking a little extra comfort during their stay."
discount
: 
0
id
: 
3
image
: 
"https://plus.unsplash.com/premium_photo-1676823553593-ac587b35a018?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Deluxe Double Room"
regularPrice
: 
125},
{capacity
: 
4
created_at
: 
"2024-08-19T10:09:51.121163+00:00"
description
: 
"Designed for families, this room includes a queen bed and a bunk bed. Plenty of space and a kid-friendly environment."
discount
: 
15
id
: 
4
image
: 
"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Family Room"
regularPrice
: 
150},
{capacity
: 
4
created_at
: 
"2024-08-19T10:11:18.767656+00:00"
description
: 
"A luxurious suite with a separate living area, offering ample space and premium furnishings. Ideal for guests who want a more indulgent experience."
discount
: 
0
id
: 
5
image
: 
"https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Suite"
regularPrice
: 
200},
{capacity
: 
6
created_at
: 
"2024-08-19T10:12:37.708988+00:00"
description
: 
"A budget-friendly dormitory room with multiple bunk beds, ideal for backpackers and group travelers looking for a social environment."
discount
: 
20
id
: 
6
image
: 
"https://images.unsplash.com/photo-1549856625-824ce09aefc8?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Dormitory Room"
regularPrice
: 
35},
{capacity
: 
2
created_at
: 
"2024-08-19T10:14:10.695521+00:00"
description
: 
"A room designed with accessibility in mind, featuring a spacious layout, easy-to-use amenities, and a roll-in shower."
discount
: 
10
id
: 
7
image
: 
"https://images.unsplash.com/photo-1656646523588-e5e2575e2ec3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Accessible Room"
regularPrice
: 
110},
{capacity
: 
6
created_at
: 
"2024-08-19T10:15:12.449832+00:00"
description
: 
"The ultimate in luxury, this penthouse suite offers stunning views, top-of-the-line amenities, and a private terrace for an unforgettable stay."
discount
: 
10
id
: 
8
image
: 
"https://images.unsplash.com/photo-1565623833408-d77e39b88af6?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
name
: 
"Penthouse Suite"
regularPrice
: 
350}
*/

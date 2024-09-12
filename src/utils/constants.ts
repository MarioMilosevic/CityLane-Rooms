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

export const bookingsSortOptions = [
  "date (recent first)",
  "date (earlier first)",
  "amount (high first)",
  "amount (low first)",
];

// Rooms

export const roomsTabs = ["All", "With discount", "No discount"];

export const roomsSortOptions = [
  "name (A-Z)",
  "name (Z-A)",
  "price (low first)",
  "price (high first)",
  "capacity (low first)",
  "capacity (high first)",
];

// Users

// Settings

export const initialSettingsState = {
  id: 0,
  breakfastPrice: 0,
  created_at: "",
  maxGuests: 0,
  maxNights: 0,
  minNights: 0,
};

// u slucaju da mi nestane rooms
export const rooms = [
  {
    capacity: 1,
    description:
      "A cozy single room, perfect for solo travelers. Features a comfortable bed, a work desk, and all the essentials for a pleasant stay.",
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Standard Single Room",
    regularPrice: 75,
  },

  {
    capacity: 2,

    description:
      "A comfortable double room with a queen-size bed, ideal for couples or friends. Enjoy a relaxing atmosphere with modern amenities.",
    discount: 5,

    image:
      "https://images.unsplash.com/photo-1576354302919-96748cb8299e?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Standard Double Room",
    regularPrice: 95,
  },
  {
    capacity: 2,
    description:
      "A spacious double room with elegant decor and upgraded amenities. Perfect for those seeking a little extra comfort during their stay.",
    discount: 0,
    image:
      "https://plus.unsplash.com/premium_photo-1676823553593-ac587b35a018?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Deluxe Double Room",
    regularPrice: 125,
  },
  {
    capacity: 4,

    description:
      "Designed for families, this room includes a queen bed and a bunk bed. Plenty of space and a kid-friendly environment.",
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Family Room",
    regularPrice: 150,
  },

  {
    capacity: 4,

    description:
      "A luxurious suite with a separate living area, offering ample space and premium furnishings. Ideal for guests who want a more indulgent experience.",
    discount: 0,

    image:
      "https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Suite",
    regularPrice: 200,
  },
  {
    capacity: 6,

    description:
      "A budget-friendly dormitory room with multiple bunk beds, ideal for backpackers and group travelers looking for a social environment.",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1549856625-824ce09aefc8?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dormitory Room",
    regularPrice: 35,
  },
  {
    capacity: 2,
    description:
      "A room designed with accessibility in mind, featuring a spacious layout, easy-to-use amenities, and a roll-in shower.",
    discount: 10,

    image:
      "https://images.unsplash.com/photo-1656646523588-e5e2575e2ec3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Accessible Room",
    regularPrice: 110,
  },
  {
    capacity: 6,
    description:
      "The ultimate in luxury, this penthouse suite offers stunning views, top-of-the-line amenities, and a private terrace for an unforgettable stay.",
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Penthouse Suite",
    regularPrice: 350,
  },
];

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
{capacity: 6,
created_at: "2024-08-19T10:15:12.449832+00:00",
description: "The ultimate in luxury, this penthouse suite offers stunning views, top-of-the-line amenities, and a private terrace for an unforgettable stay.",
discount: 10,
id: 8,
image:"https://images.unsplash.com/photo-1565623833408-d77e39b88af6?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
name: "Penthouse Suite",
regularPrice : 350}
*/

export const guests = [
  {
    fullName: "Mohammed Ali",
    email: "mohammedali@yahoo.com",
    nationality: "Egypt",
    nationalID: "987543210",
    countryFlag: "https://flagcdn.com/eg.svg",
  },
  {
    fullName: "John Smith",
    email: "johnsmith@gmail.com",
    nationality: "United States",
    nationalID: "123456789",
    countryFlag: "https://flagcdn.com/us.svg",
  },
  {
    fullName: "Marie Curie",
    email: "marie.curie@physics.fr",
    nationality: "France",
    nationalID: "456789123",
    countryFlag: "https://flagcdn.com/fr.svg",
  },
  {
    fullName: "Akira Takahashi",
    email: "akira.takahashi@jpmail.com",
    nationality: "Japan",
    nationalID: "987654321",
    countryFlag: "https://flagcdn.com/jp.svg",
  },
  {
    fullName: "Carlos Mendoza",
    email: "carlos.mendoza@mxmail.com",
    nationality: "Mexico",
    nationalID: "654321987",
    countryFlag: "https://flagcdn.com/mx.svg",
  },
  {
    fullName: "Nina Petrov",
    email: "nina.petrov@mail.ru",
    nationality: "Russia",
    nationalID: "123987456",
    countryFlag: "https://flagcdn.com/ru.svg",
  },
  {
    fullName: "Liu Wei",
    email: "liuwei@china.cn",
    nationality: "China",
    nationalID: "789654123",
    countryFlag: "https://flagcdn.com/cn.svg",
  },
  {
    fullName: "Priya Sharma",
    email: "priya.sharma@inmail.com",
    nationality: "India",
    nationalID: "456321789",
    countryFlag: "https://flagcdn.com/in.svg",
  },
  {
    fullName: "Hans Müller",
    email: "hans.mueller@demail.com",
    nationality: "Germany",
    nationalID: "852963741",
    countryFlag: "https://flagcdn.com/de.svg",
  },
  {
    fullName: "Isabella Rossi",
    email: "isabella.rossi@itmail.com",
    nationality: "Italy",
    nationalID: "369852147",
    countryFlag: "https://flagcdn.com/it.svg",
  },
  {
    fullName: "Emily Brown",
    email: "emily.brown@ukmail.com",
    nationality: "United Kingdom",
    nationalID: "741258963",
    countryFlag: "https://flagcdn.com/gb.svg",
  },
  {
    fullName: "Ahmed Khan",
    email: "ahmed.khan@pkmail.com",
    nationality: "Pakistan",
    nationalID: "963258741",
    countryFlag: "https://flagcdn.com/pk.svg",
  },
  {
    fullName: "Sofia González",
    email: "sofia.gonzalez@esmail.com",
    nationality: "Spain",
    nationalID: "159753486",
    countryFlag: "https://flagcdn.com/es.svg",
  },
  {
    fullName: "Laura Garcia",
    email: "laura.garcia@ar.com",
    nationality: "Argentina",
    nationalID: "741852963",
    countryFlag: "https://flagcdn.com/ar.svg",
  },
  {
    fullName: "Omar Hassan",
    email: "omar.hassan@sa.com",
    nationality: "Saudi Arabia",
    nationalID: "852741963",
    countryFlag: "https://flagcdn.com/sa.svg",
  },
  {
    fullName: "Chloe Martin",
    email: "chloe.martin@canmail.ca",
    nationality: "Canada",
    nationalID: "963741258",
    countryFlag: "https://flagcdn.com/ca.svg",
  },
  {
    fullName: "Felipe Santos",
    email: "felipe.santos@brmail.com",
    nationality: "Brazil",
    nationalID: "852963147",
    countryFlag: "https://flagcdn.com/br.svg",
  },
  {
    fullName: "Ana Silva",
    email: "ana.silva@ptmail.com",
    nationality: "Portugal",
    nationalID: "753951456",
    countryFlag: "https://flagcdn.com/pt.svg",
  },
  {
    fullName: "Dmitry Ivanov",
    email: "dmitry.ivanov@ru.com",
    nationality: "Russia",
    nationalID: "456789654",
    countryFlag: "https://flagcdn.com/ru.svg",
  },
  {
    fullName: "Nguyen Thi Lan",
    email: "nguyen.lan@vn.com",
    nationality: "Vietnam",
    nationalID: "741369852",
    countryFlag: "https://flagcdn.com/vn.svg",
  },
  {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@nzmail.co.nz",
    nationality: "New Zealand",
    nationalID: "963852741",
    countryFlag: "https://flagcdn.com/nz.svg",
  },
  {
    fullName: "Yusuf Olatunji",
    email: "yusuf.olatunji@ngmail.com",
    nationality: "Nigeria",
    nationalID: "321654987",
    countryFlag: "https://flagcdn.com/ng.svg",
  },
  {
    fullName: "Katerina Dimitrova",
    email: "katerina.dimitrova@bgmail.com",
    nationality: "Bulgaria",
    nationalID: "654789123",
    countryFlag: "https://flagcdn.com/bg.svg",
  },
  {
    fullName: "Rafael Duarte",
    email: "rafael.duarte@ptmail.com",
    nationality: "Portugal",
    nationalID: "951753486",
    countryFlag: "https://flagcdn.com/pt.svg",
  },
];

export const bookings = [
  {
    startDate: "2024-11-06 00:00:00",
    endDate: "2024-11-13 00:00:00",
    numNights: 7,
    numGuests: 1,
    roomPrice: 1750,
    extras: 105,
    totalPrice: 1855,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "I have a gluten allergy",
    roomId: 281,
    guestId: 2,
  },
  {
    startDate: "2024-10-24 00:00:00",
    endDate: "2024-11-03 00:00:00",
    numNights: 10,
    numGuests: 2,
    roomPrice: 2500,
    extras: 300,
    totalPrice: 2800,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 281,
    guestId: 3,
  },
  {
    startDate: "2024-11-10 00:00:00",
    endDate: "2024-11-16 00:00:00",
    numNights: 6,
    numGuests: 2,
    roomPrice: 1500,
    extras: 0,
    totalPrice: 1500,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    observations: "EMPTY",
    roomId: 282,
    guestId: 5,
  },
  {
    startDate: "2024-11-29 00:00:00",
    endDate: "2024-12-15 00:00:00",
    numNights: 16,
    numGuests: 2,
    roomPrice: 5200,
    extras: 0,
    totalPrice: 5200,
    status: "checked-out",
    hasBreakfast: false,
    isPaid: true,
    observations: "EMPTY",
    roomId: 282,
    guestId: 6,
  },
  {
    startDate: "2024-11-09 00:00:00",
    endDate: "2024-11-12 00:00:00",
    numNights: 3,
    numGuests: 2,
    roomPrice: 975,
    extras: 90,
    totalPrice: 1065,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 282,
    guestId: 7,
  },
  {
    startDate: "2024-12-09 00:00:00",
    endDate: "2024-12-24 00:00:00",
    numNights: 15,
    numGuests: 2,
    roomPrice: 4875,
    extras: 450,
    totalPrice: 5325,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "EMPTY",
    roomId: 282,
    guestId: 8,
  },
  {
    startDate: "2024-10-12 00:00:00",
    endDate: "2024-10-17 00:00:00",
    numNights: 5,
    numGuests: 4,
    roomPrice: 1500,
    extras: 300,
    totalPrice: 1800,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 283,
    guestId: 9,
  },
  {
    startDate: "2024-11-04 00:00:00",
    endDate: "2024-11-06 00:00:00",
    numNights: 2,
    numGuests: 3,
    roomPrice: 600,
    extras: 0,
    totalPrice: 600,
    status: "checked-in",
    hasBreakfast: false,
    isPaid: true,
    observations: "We will be bringing our service animal",
    roomId: 283,
    guestId: 10,
  },
  {
    startDate: "2024-10-23 00:00:00",
    endDate: "2024-10-26 00:00:00",
    numNights: 3,
    numGuests: 4,
    roomPrice: 900,
    extras: 180,
    totalPrice: 1080,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 283,
    guestId: 11,
  },
  {
    startDate: "2024-10-07 00:00:00",
    endDate: "2024-10-19 00:00:00",
    numNights: 12,
    numGuests: 4,
    roomPrice: 5400,
    extras: 720,
    totalPrice: 6120,
    status: "checked-in",
    hasBreakfast: true,
    isPaid: false,
    observations: "EMPTY",
    roomId: 284,
    guestId: 12,
  },
  {
    startDate: "2024-11-08 00:00:00",
    endDate: "2024-11-13 00:00:00",
    numNights: 5,
    numGuests: 4,
    roomPrice: 2250,
    extras: 300,
    totalPrice: 2550,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 284,
    guestId: 13,
  },
  {
    startDate: "2024-10-11 00:00:00",
    endDate: "2024-10-12 00:00:00",
    numNights: 1,
    numGuests: 1,
    roomPrice: 450,
    extras: 0,
    totalPrice: 450,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    observations: "EMPTY",
    roomId: 284,
    guestId: 14,
  },
  {
    startDate: "2024-10-30 00:00:00",
    endDate: "2024-11-06 00:00:00",
    numNights: 7,
    numGuests: 5,
    roomPrice: 2450,
    extras: 525,
    totalPrice: 2975,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "EMPTY",
    roomId: 285,
    guestId: 15,
  },
  {
    startDate: "2024-11-02 00:00:00",
    endDate: "2024-11-04 00:00:00",
    numNights: 2,
    numGuests: 4,
    roomPrice: 700,
    extras: 120,
    totalPrice: 820,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 285,
    guestId: 16,
  },
  {
    startDate: "2024-10-30 00:00:00",
    endDate: "2024-11-02 00:00:00",
    numNights: 3,
    numGuests: 6,
    roomPrice: 1050,
    extras: 0,
    totalPrice: 1050,
    status: "checked-out",
    hasBreakfast: false,
    isPaid: true,
    observations: "EMPTY",
    roomId: 285,
    guestId: 17,
  },
  {
    startDate: "2024-11-01 00:00:00",
    endDate: "2024-11-12 00:00:00",
    numNights: 11,
    numGuests: 6,
    roomPrice: 7700,
    extras: 0,
    totalPrice: 7700,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: true,
    observations: "We will be checking in late around 11 PM",
    roomId: 286,
    guestId: 18,
  },
  {
    startDate: "2024-10-18 00:00:00",
    endDate: "2024-10-25 00:00:00",
    numNights: 7,
    numGuests: 4,
    roomPrice: 4900,
    extras: 420,
    totalPrice: 5320,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "I will need a rollaway bed for the children",
    roomId: 286,
    guestId: 19,
  },
  {
    startDate: "2024-11-05 00:00:00",
    endDate: "2024-11-08 00:00:00",
    numNights: 3,
    numGuests: 6,
    roomPrice: 2100,
    extras: 270,
    totalPrice: 2370,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 286,
    guestId: 20,
  },
  {
    startDate: "2024-12-09 00:00:00",
    endDate: "2024-12-15 00:00:00",
    numNights: 6,
    numGuests: 8,
    roomPrice: 3000,
    extras: 0,
    totalPrice: 3000,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: true,
    observations: "EMPTY",
    roomId: 287,
    guestId: 21,
  },
  {
    startDate: "2024-11-12 00:00:00",
    endDate: "2024-11-22 00:00:00",
    numNights: 10,
    numGuests: 7,
    roomPrice: 5000,
    extras: 1050,
    totalPrice: 6050,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: true,
    observations: "EMPTY",
    roomId: 287,
    guestId: 22,
  },
  {
    startDate: "2024-12-08 00:00:00",
    endDate: "2024-12-13 00:00:00",
    numNights: 5,
    numGuests: 6,
    roomPrice: 2500,
    extras: 450,
    totalPrice: 2950,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "EMPTY",
    roomId: 287,
    guestId: 23,
  },
  {
    startDate: "2024-11-10 00:00:00",
    endDate: "2024-11-15 00:00:00",
    numNights: 5,
    numGuests: 9,
    roomPrice: 7000,
    extras: 675,
    totalPrice: 7675,
    status: "checked-in",
    hasBreakfast: true,
    isPaid: true,
    observations: "My wife has a gluten allergy",
    roomId: 288,
    guestId: 1,
  },
  {
    startDate: "2024-11-06 00:00:00",
    endDate: "2024-11-16 00:00:00",
    numNights: 10,
    numGuests: 10,
    roomPrice: 7000,
    extras: 750,
    totalPrice: 7750,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "I am celebrating my anniversary",
    roomId: 288,
    guestId: 24,
  },
  {
    startDate: "2024-11-16 00:00:00",
    endDate: "2024-11-19 00:00:00",
    numNights: 3,
    numGuests: 7,
    roomPrice: 4200,
    extras: 0,
    totalPrice: 4200,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: true,
    observations: "EMPTY",
    roomId: 288,
    guestId: 25,
  },
];

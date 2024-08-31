import { RoomType } from "../types/types";

// export const sortRooms = (rooms: RoomType[], sortKey: string) => {
//   const sortedRooms = [...rooms];
//   switch (sortKey) {
//     case "name (A-Z)":
//       return sortedRooms.sort((a, b) => a.name.localeCompare(b.name));
//     case "name (Z-A)":
//       return sortedRooms.sort((a, b) => b.name.localeCompare(a.name));
//     case "price (low first)":
//       return sortedRooms.sort(
//         (a, b) => Number(a.regularPrice) - Number(b.regularPrice)
//       );
//     case "price (high first)":
//       return sortedRooms.sort(
//         (a, b) => Number(b.regularPrice) - Number(a.regularPrice)
//       );
//     case "capacity (low first)":
//       return sortedRooms.sort(
//         (a, b) => Number(a.capacity) - Number(b.capacity)
//       );
//     case "capacity (high first)":
//       return sortedRooms.sort(
//         (a, b) => Number(b.capacity) - Number(a.capacity)
//       );
//     default:
//       return sortedRooms;
//   }
// };

export const updateRooms = (rooms, filter, sort) => {
  console.log('uslo')
  let roomsCopy = [...rooms];
  if (filter === "All rooms") {
    roomsCopy = [...rooms];
  }
  if (filter === "No discount") {
    roomsCopy = roomsCopy.filter((room) => room.discount === 0);
  }

  if (filter === "With discount") {
    roomsCopy = roomsCopy.filter((room) => room.discount > 0);
  }
  if (sort === "name (A-Z)") {
    roomsCopy.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "name (Z-A)") {
    roomsCopy.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sort === "price (low first)") {
    roomsCopy.sort((a, b) => Number(a.regularPrice) - Number(b.regularPrice));
  }
  if (sort === "price (high first)") {
    roomsCopy.sort((a, b) => Number(b.regularPrice) - Number(a.regularPrice));
  }
  if (sort === "capacity (low first)") {
    roomsCopy.sort((a, b) => Number(a.capacity) - Number(b.capacity));
  }
  if (sort === "capacity (high first)") {
    roomsCopy.sort((a, b) => Number(b.capacity) - Number(a.capacity));
  }

  return roomsCopy;
};




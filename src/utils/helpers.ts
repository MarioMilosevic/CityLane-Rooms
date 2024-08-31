import { RoomType } from "../types/types";

export const sortRooms = (rooms: RoomType[], sortKey: string) => {
  const sortedRooms = [...rooms]; 
  switch (sortKey) {
    case "name (A-Z)":
      return sortedRooms.sort((a, b) => a.name.localeCompare(b.name));
    case "name (Z-A)":
      return sortedRooms.sort((a, b) => b.name.localeCompare(a.name));
    case "price (low first)":
      return sortedRooms.sort(
        (a, b) => Number(a.regularPrice) - Number(b.regularPrice)
      );
    case "price (high first)":
      return sortedRooms.sort(
        (a, b) => Number(b.regularPrice) - Number(a.regularPrice)
      );
    case "capacity (low first)":
      return sortedRooms.sort(
        (a, b) => Number(a.capacity) - Number(b.capacity)
      );
    case "capacity (high first)":
      return sortedRooms.sort(
        (a, b) => Number(b.capacity) - Number(a.capacity)
      );
    default:
      return sortedRooms;
  }
};

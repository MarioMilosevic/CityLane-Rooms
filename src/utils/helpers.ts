import { RoomType } from "../types/types";

export const sortRooms = (rooms: RoomType[], sortKey: string) => {
  switch (sortKey) {
    case "name (A-Z)":
      return rooms.sort((a, b) => a.name.localeCompare(b.name));
    case "name (Z-A)":
      return rooms.sort((a, b) => b.name.localeCompare(a.name));
    case "price (low first)":
      return rooms.sort((a, b) => Number(a.regularPrice) - Number(b.regularPrice));
    case "price (high first)":
      return rooms.sort((a, b) => Number(b.regularPrice) - Number(a.regularPrice));
    case "price (capacity (low first)":
      return rooms.sort((a, b) => Number(a.capacity) - Number(b.capacity));
    case "price (capacity (high first)":
      return rooms.sort((a, b) => Number(b.capacity) - Number(a.capacity));
    default:
      return rooms;
  }
};


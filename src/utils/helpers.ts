import { RoomType } from "../types/types";

export const updateRooms = (
  rooms: RoomType[],
  filter: string,
  sort: string
): RoomType[] => {
  console.log(filter)
  let roomsCopy = [...rooms];

  switch (filter) {
    case "No discount":
      roomsCopy = roomsCopy.filter((room) => room.discount === 0);
      break;
    case "With discount":
      roomsCopy = roomsCopy.filter((room) => room.discount > 0);
      break;
    case "All rooms":
    default:
      break;
  }

  // Apply sort using switch
  switch (sort) {
    case "name (A-Z)":
      roomsCopy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name (Z-A)":
      roomsCopy.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price (low first)":
      roomsCopy.sort((a, b) => Number(a.regularPrice) - Number(b.regularPrice));
      break;
    case "price (high first)":
      roomsCopy.sort((a, b) => Number(b.regularPrice) - Number(a.regularPrice));
      break;
    case "capacity (low first)":
      roomsCopy.sort((a, b) => Number(a.capacity) - Number(b.capacity));
      break;
    case "capacity (high first)":
      roomsCopy.sort((a, b) => Number(b.capacity) - Number(a.capacity));
      break;
    default:
      // If no valid sort option is provided, return as is
      break;
  }

  return roomsCopy;
};


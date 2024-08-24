import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export const useRoomsSlice = () => {
  const rooms = useSelector((state: RootState) => state.rooms);
  return rooms;
};


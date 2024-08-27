import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomsState, RoomType } from "../../utils/types";
import { initialRoomsState } from "../../utils/constants";

const initialState: RoomsState = {
  rooms: initialRoomsState,
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomType[]>) => {
      state.rooms = action.payload;
    },
    deleteRoom: (state, action:PayloadAction<number>) => {
     state.rooms = state.rooms.filter((room) => room.id !== action.payload)
    },
    addRoom: (state, action:PayloadAction<RoomType>) => {
      state.rooms.push(action.payload)
    }
  },
});


export const { setRooms, deleteRoom, addRoom } = roomsSlice.actions;

export default roomsSlice.reducer;

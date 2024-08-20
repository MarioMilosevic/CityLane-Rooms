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
  },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;

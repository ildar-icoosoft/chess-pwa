import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

interface GameClockState {}

const initialState: GameClockState = {};

const gameClockSlice = createSlice({
  name: "gameClock",
  initialState,
  reducers: {
    increment1Sec() {},
  },
  extraReducers: {},
});

export const { increment1Sec } = gameClockSlice.actions;

export default gameClockSlice.reducer;

export const startGameClock = (): AppThunk<void> => (dispatch) => {
  setInterval(() => {
    dispatch(increment1Sec());
  }, 1000);
};

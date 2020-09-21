import { createSlice } from "@reduxjs/toolkit";

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

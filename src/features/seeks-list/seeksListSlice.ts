import { createSlice } from "@reduxjs/toolkit";

interface SeeksListState {
  isLoading: boolean;
  error: string | null;
  items: number[];
}

const initialState: SeeksListState = {
  isLoading: true,
  error: null,
  items: [],
};

const seeksListSlice = createSlice({
  name: "seeks",
  initialState,
  reducers: {},
});

export default seeksListSlice.reducer;

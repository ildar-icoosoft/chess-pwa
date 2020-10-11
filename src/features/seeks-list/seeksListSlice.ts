import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";

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
  reducers: {
    getSeeksListRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getSeeksListSuccess(
      state,
      action: PayloadAction<NormalizedData<number[]>>
    ) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.result;
    },
    getSeeksListError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
});

export const {
  getSeeksListRequest,
  getSeeksListSuccess,
  getSeeksListError,
} = seeksListSlice.actions;

export default seeksListSlice.reducer;

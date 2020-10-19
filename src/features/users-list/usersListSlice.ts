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

const usersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersListRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUsersListSuccess(
      state,
      action: PayloadAction<NormalizedData<number[]>>
    ) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.result;
    },
    getUsersListError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
  extraReducers: {},
});

export const {
  getUsersListRequest,
  getUsersListSuccess,
  getUsersListError,
} = usersListSlice.actions;

export default usersListSlice.reducer;

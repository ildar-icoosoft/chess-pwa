import { createSlice } from "@reduxjs/toolkit";
import { createSeekSuccess } from "../challenge/challengeSlice";

interface SeekModalState {
  isSeekModalVisible: boolean;
}

const initialState: SeekModalState = {
  isSeekModalVisible: false,
};

const seekModalSlice = createSlice({
  name: "seekModal",
  initialState,
  reducers: {
    showSeekModal(state) {
      state.isSeekModalVisible = true;
    },
    hideSeekModal(state) {
      state.isSeekModalVisible = false;
    },
  },
  extraReducers: {
    [createSeekSuccess.type]: (state) => {
      state.isSeekModalVisible = false;
    },
  },
});

export const { showSeekModal, hideSeekModal } = seekModalSlice.actions;

export default seekModalSlice.reducer;

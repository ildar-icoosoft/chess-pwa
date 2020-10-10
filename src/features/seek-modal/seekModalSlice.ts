import { createSlice } from "@reduxjs/toolkit";

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
});

export const { showSeekModal, hideSeekModal } = seekModalSlice.actions;

export default seekModalSlice.reducer;

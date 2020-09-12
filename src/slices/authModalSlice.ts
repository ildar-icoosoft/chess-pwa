import { createSlice } from "@reduxjs/toolkit";

interface AuthModalState {
  isAuthModalVisible: boolean;
}

const initialState: AuthModalState = {
  isAuthModalVisible: false,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    showAuthModal(state) {
      state.isAuthModalVisible = true;
    },
    hideAuthModal(state) {
      state.isAuthModalVisible = false;
    },
  },
});

export const { showAuthModal, hideAuthModal } = authModalSlice.actions;

export default authModalSlice.reducer;

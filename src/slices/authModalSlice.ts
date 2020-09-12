import { createSlice } from "@reduxjs/toolkit";
import { loginSuccess, registerSuccess } from "./currentUserSlice";

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
  extraReducers: {
    [loginSuccess.toString()]: (state) => {
      state.isAuthModalVisible = false;
    },
    [registerSuccess.toString()]: (state) => {
      state.isAuthModalVisible = false;
    },
  },
});

export const { showAuthModal, hideAuthModal } = authModalSlice.actions;

export default authModalSlice.reducer;
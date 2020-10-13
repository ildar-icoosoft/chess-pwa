import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShowMessagePayload {
  id: string;
  body: string;
}

interface MessageItemState {
  body: string;
}

interface MessagesState {
  [messageId: string]: MessageItemState;
}

const initialState: MessagesState = {};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<ShowMessagePayload>) => {
      state[action.payload.id] = {
        body: action.payload.body,
      };
    },
    hideMessage: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { showMessage, hideMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

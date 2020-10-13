import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { acceptSeekError } from "../challenge/challengeSlice";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";

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
  extraReducers: {
    [acceptSeekError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.acceptSeekError = {
        body: action.payload.error,
      };
    },
  },
});

export const { showMessage, hideMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

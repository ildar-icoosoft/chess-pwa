import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pullAllBy as _pullAllBy } from "lodash";
import { acceptSeekError } from "../challenge/challengeSlice";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";

export interface ShowMessagePayload {
  id: string;
  body: string;
}

interface MessageItemState {
  id: string;
  body: string;
}

type MessagesState = Array<MessageItemState>;

const initialState: MessagesState = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<ShowMessagePayload>) => {
      state.push(action.payload as MessageItemState);
    },
    hideMessage: (state, action: PayloadAction<string>) => {
      _pullAllBy(state, [{ id: action.payload }], "id");
    },
  },
  extraReducers: {
    [acceptSeekError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.push({
        id: "acceptSeekError",
        body: action.payload.error,
      });
    },
  },
});

export const { showMessage, hideMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

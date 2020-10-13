import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pullAllBy as _pullAllBy } from "lodash";
import { acceptSeekError } from "../challenge/challengeSlice";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";

export interface MessageItemState {
  id: string;
  body: string;
}

export type MessagesState = Array<MessageItemState>;

const initialState: MessagesState = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<MessageItemState>) => {
      state.push(action.payload);
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

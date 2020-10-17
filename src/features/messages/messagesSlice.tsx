/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pullAllBy as _pullAllBy } from "lodash";
import { acceptSeekError } from "../challenge/challengeSlice";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";
import { Message } from "../../interfaces/Message";
import { makeMoveError } from "../move/moveSlice";
import {
  getCurrentUserError,
  logoutError,
} from "../current-user/currentUserSlice";
import {
  abortGameError,
  resignGameError,
} from "../single-game/singleGameSlice";

const initialState: Message[] = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<Message>) => {
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
    [makeMoveError.type]: (state, action: PayloadAction<string>) => {
      state.push({
        id: "makeMoveError",
        body: action.payload,
      });
    },
    [getCurrentUserError.type]: (state, action: PayloadAction<string>) => {
      state.push({
        id: "getCurrentUserError",
        body: action.payload,
      });
    },
    [logoutError.type]: (state, action: PayloadAction<string>) => {
      state.push({
        id: "logoutError",
        body: action.payload,
      });
    },
    [abortGameError.type]: (state, action: PayloadAction<ItemErrorPayload>) => {
      state.push({
        id: "abortGameError",
        body: action.payload.error,
      });
    },
    [resignGameError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.push({
        id: "resignGameError",
        body: action.payload.error,
      });
    },
  },
});

export const { showMessage, hideMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

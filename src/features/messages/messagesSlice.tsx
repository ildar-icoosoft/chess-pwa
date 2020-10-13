import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});

export default messagesSlice.reducer;

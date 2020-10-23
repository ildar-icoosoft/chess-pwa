import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";

interface GameChatMessagesState {
  isLoading: boolean;
  error: string | null;
  items: number[];
}

interface ChatMessagesState {
  [gameId: string]: GameChatMessagesState;
}

export const defaultGameChatMessagesState: GameChatMessagesState = {
  isLoading: true,
  error: null,
  items: [],
};

const initialState: ChatMessagesState = {};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChatMessagesListRequest(state) {
      // state.isLoading = true;
      // state.error = null;
    },
    getChatMessagesListSuccess(
      state,
      action: PayloadAction<NormalizedData<number[]>>
    ) {
      // state.isLoading = false;
      // state.error = null;
      // state.items = action.payload.result;
    },
    getChatMessagesListError(state, action: PayloadAction<string>) {
      // state.isLoading = false;
      // state.error = action.payload;
      // state.items = [];
    },
  },
  extraReducers: {},
});

export const {
  getChatMessagesListRequest,
  getChatMessagesListSuccess,
  getChatMessagesListError,
} = chatSlice.actions;

export default chatSlice.reducer;

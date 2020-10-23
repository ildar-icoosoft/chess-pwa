import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";
import { defaultSingleGameItemState } from "../single-game/singleGameSlice";

interface GameChatMessagesState {
  isLoading: boolean;
  error: string | null;
  items: number[];
}

interface GetChatMessagesListSuccessPayload {
  gameId: number;
  normalizedChatMessages: NormalizedData<number[]>;
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
    getChatMessagesListRequest(state, action: PayloadAction<number>) {
      state[action.payload] = Object.assign(
        {},
        defaultGameChatMessagesState,
        state[action.payload],
        {
          isLoading: true,
          error: null,
        }
      );
    },
    getChatMessagesListSuccess(
      state,
      action: PayloadAction<GetChatMessagesListSuccessPayload>
    ) {
      state[action.payload.gameId] = Object.assign(
        {},
        defaultGameChatMessagesState,
        state[action.payload.gameId],
        {
          isLoading: false,
          error: null,
          items: action.payload.normalizedChatMessages.result,
        }
      );
    },
    getChatMessagesListError(state, action: PayloadAction<ItemErrorPayload>) {
      state[action.payload.itemId] = Object.assign(
        {},
        defaultGameChatMessagesState,
        state[action.payload.itemId],
        {
          isLoading: false,
          error: action.payload.error,
          items: [],
        }
      );
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

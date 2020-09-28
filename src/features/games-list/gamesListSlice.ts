/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import gameSchema from "../../normalizr/schemas/gameSchema";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import { challengeAiSuccess } from "../challenge/challengeSlice";
import {
  createGameBySubscription,
  updateGameBySubscription,
} from "../data-subscription/dataSubscriptionSlice";

interface GamesListState {
  items: number[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GamesListState = {
  items: [],
  isLoading: true,
  error: null,
};

const gamesListSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    getGamesListRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getGamesListSuccess(
      state,
      action: PayloadAction<NormalizedData<number[]>>
    ) {
      state.items = action.payload.result;
      state.isLoading = false;
      state.error = null;
    },
    getGamesListError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [challengeAiSuccess.type]: (
      state,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.unshift(action.payload.result);
      }
    },
    [createGameBySubscription.type]: (
      state,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.unshift(action.payload.result);
      }
    },
    [updateGameBySubscription.type]: (
      state,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.unshift(action.payload.result);
      }
    },
  },
});

export const {
  getGamesListRequest,
  getGamesListSuccess,
  getGamesListError,
} = gamesListSlice.actions;

export default gamesListSlice.reducer;

export const fetchGames = (): AppThunk<Promise<Game[]>> => (dispatch) => {
  dispatch(getGamesListRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/game/playing", (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        const normalizedGames = normalize(body as Game[], [gameSchema]);
        dispatch(getGamesListSuccess(normalizedGames));

        resolve(body as Game[]);
      } else {
        dispatch(getGamesListError(body as string));
        reject(jwr);
      }
    });
  });
};

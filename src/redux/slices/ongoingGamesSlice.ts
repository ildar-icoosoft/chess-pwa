import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import gameSchema from "../schemas/gameSchema";
import NormalizedData from "../interfaces/NormalizedData";

interface OngoingGamesState {
  items: number[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OngoingGamesState = {
  items: [],
  isLoading: true,
  error: null,
};

const ongoingGamesSlice = createSlice({
  name: "ongoingGames",
  initialState,
  reducers: {
    getOngoingGamesRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getOngoingGamesSuccess(
      state,
      action: PayloadAction<NormalizedData<number[]>>
    ) {
      state.items = action.payload.result;
      state.isLoading = false;
      state.error = null;
    },
    getOngoingGamesError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  getOngoingGamesRequest,
  getOngoingGamesSuccess,
  getOngoingGamesError,
} = ongoingGamesSlice.actions;

export default ongoingGamesSlice.reducer;

export const fetchOngoingGames = (): AppThunk<Promise<Game[]>> => (
  dispatch
) => {
  dispatch(getOngoingGamesRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/game/playing", (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        const normalizedGames = normalize(body as Game[], [gameSchema]);
        dispatch(getOngoingGamesSuccess(normalizedGames));

        resolve(body as Game[]);
      } else {
        dispatch(getOngoingGamesError(body as string));
        reject(jwr);
      }
    });
  });
};

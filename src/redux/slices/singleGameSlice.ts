import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import gameSchema from "../schemas/gameSchema";
import ItemErrorPayload from "../interfaces/ItemErrorPayload";
import NormalizedItem from "../interfaces/NormalizedItem";

interface SingleGameState {
  [gameId: string]: {
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: SingleGameState = {};

const singleGameSlice = createSlice({
  name: "singleGame",
  initialState,
  reducers: {
    getSingleGameRequest(state, action: PayloadAction<number>) {
      state[action.payload] = {
        isLoading: true,
        error: null,
      };
    },
    getSingleGameSuccess(state, action: PayloadAction<NormalizedItem>) {
      state[action.payload.result] = {
        isLoading: false,
        error: null,
      };
    },
    getSingleGameError(state, action: PayloadAction<ItemErrorPayload>) {
      state[action.payload.itemId] = {
        isLoading: false,
        error: action.payload.error,
      };
    },
  },
  extraReducers: {},
});

export const {
  getSingleGameRequest,
  getSingleGameSuccess,
  getSingleGameError,
} = singleGameSlice.actions;

export default singleGameSlice.reducer;

export const fetchGame = (id: number): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(getSingleGameRequest(id));

  return new Promise((resolve, reject) => {
    ioClient.socket.get(`/game/${id}`, (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        const normalizedGame = normalize(body as Game, gameSchema);
        dispatch(getSingleGameSuccess(normalizedGame));
        resolve(body as Game);
      } else {
        dispatch(
          getSingleGameError({
            itemId: id,
            error: body as string,
          })
        );
        reject(jwr);
      }
    });
  });
};

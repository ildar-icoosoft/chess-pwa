import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NormalizedData from "../interfaces/NormalizedData";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import gameSchema from "../schemas/gameSchema";

interface ChallengeState {}

const initialState: ChallengeState = {};

const challengeState = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    challengeAiRequest() {},
    challengeAiSuccess(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    challengeAiError(_state, _action: PayloadAction<string>) {},
  },
  extraReducers: {},
});

export const {
  challengeAiRequest,
  challengeAiSuccess,
  challengeAiError,
} = challengeState.actions;

export default challengeState.reducer;

export const challengeAi = (data: ChallengeAiData): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(challengeAiRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/challenge/ai`,
      data,
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGame = normalize(body as Game, gameSchema);

          dispatch(challengeAiSuccess(normalizedGame));
          resolve(body as Game);
        } else {
          dispatch(challengeAiError(body as string));
          reject(jwr);
        }
      }
    );
  });
};

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { CreateSeekData } from "../../interfaces/CreateSeekData";
import { CreateSeekResult } from "../../interfaces/CreateSeekResult";

interface ChallengeState {}

const initialState: ChallengeState = {};

const challengeSlice = createSlice({
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
} = challengeSlice.actions;

export default challengeSlice.reducer;

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

export const createSeek = (
  data: CreateSeekData
): AppThunk<Promise<CreateSeekResult>> => (dispatch) => {
  return Promise.resolve({
    gameId: 1,
  });

  /*dispatch(challengeAiRequest());

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
  });*/
};

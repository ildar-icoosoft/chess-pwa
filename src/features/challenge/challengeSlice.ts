/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import { isString as _isString } from "lodash";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { CreateSeekData } from "../../interfaces/CreateSeekData";

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
    createSeekRequest() {},
    createSeekSuccess(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    createSeekError(_state, _action: PayloadAction<string>) {},
  },
  extraReducers: {},
});

export const {
  challengeAiRequest,
  challengeAiSuccess,
  challengeAiError,
  createSeekRequest,
  createSeekSuccess,
  createSeekError,
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

export const createSeek = (data: CreateSeekData): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(createSeekRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/seek`,
      data,
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGame = normalize(body as Game, gameSchema);

          dispatch(createSeekSuccess(normalizedGame));
          resolve(body as Game);
        } else {
          dispatch(
            createSeekError(_isString(body) ? body : "Internal server error")
          );
          reject(jwr);
        }
      }
    );
  });
};

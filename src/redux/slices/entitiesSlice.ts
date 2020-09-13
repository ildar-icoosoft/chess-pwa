import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import Game from "../../interfaces/Game";
import User from "../../interfaces/User";
import {
  getGamesSuccess,
  updateGameSuccess,
  makeMoveSuccess,
  getSingleGameSuccess,
} from "./gamesSlice";
import gameSchema from "../normalizr/schemas/gameSchema";
import { SubscriptionData } from "../../interfaces/SubscriptionData";
import { NormalizedGamesList } from "../normalizr/interfaces/game";

interface EntitiesState {
  users: Record<string, User>;
  games: Record<string, Game>;
}

const initialState: EntitiesState = {
  users: {},
  games: {},
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {},
  extraReducers: {
    [getGamesSuccess.toString()]: (
      state,
      action: PayloadAction<NormalizedGamesList>
    ) => {
      Object.assign(state, action.payload.entities);
    },
    [updateGameSuccess.toString()]: (
      state,
      action: PayloadAction<SubscriptionData>
    ) => {
      const subscriptionData = action.payload;

      const game = {
        ...subscriptionData.previous,
        ...subscriptionData.data,
      };

      const normalizedGame = normalize(game, gameSchema);

      Object.assign(state, normalizedGame.entities);
    },
    [makeMoveSuccess.toString()]: (state, action: PayloadAction<Game>) => {
      const normalizedGame = normalize(action.payload, gameSchema);

      Object.assign(state, normalizedGame.entities);
    },
    [getSingleGameSuccess.toString()]: (state, action: PayloadAction<Game>) => {
      const normalizedGame = normalize(action.payload, gameSchema);

      Object.assign(state, normalizedGame.entities);
    },
  },
});

export default entitiesSlice.reducer;

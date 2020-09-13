import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import Game from "../../interfaces/Game";
import User from "../../interfaces/User";
import { getGamesSuccess } from "./gamesSlice";
import gameSchema from "../schemas/gameSchema";

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
    [getGamesSuccess.toString()]: (state, action: PayloadAction<Game[]>) => {
      const normalizedGames = normalize(action.payload, [gameSchema]);
      Object.assign(state, normalizedGames.entities);
    },
  },
});

export default entitiesSlice.reducer;

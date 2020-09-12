import { combineReducers } from "@reduxjs/toolkit";
import gamesReducer from "../slices/gamesSlice";

const rootReducer = combineReducers({
  games: gamesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

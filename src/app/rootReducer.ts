import { combineReducers } from "@reduxjs/toolkit";
import gamesReducer from "../slices/gamesSlice";
import currentUserReducer from "../slices/currentUserSlice";
import authModalReducer from "../slices/authModalSlice";

const rootReducer = combineReducers({
  games: gamesReducer,
  currentUser: currentUserReducer,
  authModal: authModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

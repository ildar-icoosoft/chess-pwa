import { combineReducers } from "@reduxjs/toolkit";
import gamesReducer from "../redux/slices/gamesSlice";
import currentUserReducer from "../redux/slices/currentUserSlice";
import authModalReducer from "../redux/slices/authModalSlice";
import entitiesReducer from "../redux/slices/entitiesSlice";

const rootReducer = combineReducers({
  games: gamesReducer,
  currentUser: currentUserReducer,
  authModal: authModalReducer,
  entities: entitiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

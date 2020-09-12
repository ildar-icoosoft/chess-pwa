import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import Game from "../interfaces/Game";
import ioClient from "../services/ioClient";
import { JWR } from "sails.io.js";
import { SubscriptionData } from "../interfaces/SubscriptionData";

interface GamesState {
  items: Game[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  items: [],
  isLoading: true,
  error: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    getGamesRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getGamesSuccess(state, action: PayloadAction<Game[]>) {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getGamesError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateGameSuccess(state, action: PayloadAction<SubscriptionData>) {
      const subscriptionData = action.payload;

      const game = {
        ...subscriptionData.previous,
        ...subscriptionData.data,
      };

      const founded = state.items.find((item) => item.id === game.id);

      if (founded) {
        Object.assign(founded, game);
      } else {
        state.items.push(game);
      }
    },
    createGameSuccess(state, action: PayloadAction<SubscriptionData>) {
      state.items.push(action.payload.data);
    },
  },
});

export const {
  getGamesRequest,
  getGamesSuccess,
  getGamesError,
  updateGameSuccess,
  createGameSuccess,
} = gamesSlice.actions;

export default gamesSlice.reducer;

export const fetchGames = (): AppThunk => (dispatch) => {
  dispatch(getGamesRequest());

  ioClient.socket.get("/api/v1/game/playing", (body: Game[], jwr: JWR) => {
    if (jwr.statusCode === 200) {
      dispatch(getGamesSuccess(body));
    } else {
      dispatch(getGamesError(jwr.body));
    }
  });
};

export const watchGames = (): AppThunk => (dispatch) => {
  ioClient.socket.on("game", (subscriptionData: SubscriptionData) => {
    if (subscriptionData.verb === "updated") {
      dispatch(updateGameSuccess(subscriptionData));
    } else if (subscriptionData.verb === "created") {
      dispatch(createGameSuccess(subscriptionData));
    }
  });
};

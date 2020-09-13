import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import { JWR } from "sails.io.js";
import { SubscriptionData } from "../../interfaces/SubscriptionData";

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
    makeMoveRequest() {},
    makeMoveSuccess(state, action: PayloadAction<Game>) {
      const game = action.payload;

      const founded = state.items.find((item) => item.id === game.id);

      if (founded) {
        Object.assign(founded, game);
      } else {
        state.items.push(game);
      }
    },
    makeMoveError(_state, _action: PayloadAction<string>) {},
    getSingleGameRequest() {},
    getSingleGameSuccess(state, action: PayloadAction<Game>) {
      const game = action.payload;

      const founded = state.items.find((item) => item.id === game.id);

      if (founded) {
        Object.assign(founded, game);
      } else {
        state.items.push(game);
      }
    },
    getSingleGameError(_state, _action: PayloadAction<string>) {},
  },
  extraReducers: {},
});

export const {
  getGamesRequest,
  getGamesSuccess,
  getGamesError,
  updateGameSuccess,
  createGameSuccess,
  makeMoveRequest,
  makeMoveSuccess,
  makeMoveError,
  getSingleGameRequest,
  getSingleGameSuccess,
  getSingleGameError,
} = gamesSlice.actions;

export default gamesSlice.reducer;

export const fetchGames = (): AppThunk<Promise<Game[]>> => (dispatch) => {
  dispatch(getGamesRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/game/playing", (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        dispatch(getGamesSuccess(body as Game[]));
        resolve(body as Game[]);
      } else {
        dispatch(getGamesError(body as string));
        reject(jwr);
      }
    });
  });
};

export const fetchGame = (id: number): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(getSingleGameRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get(`/game/${id}`, (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        dispatch(getSingleGameSuccess(body as Game));
        resolve(body as Game);
      } else {
        dispatch(getSingleGameError(body as string));
        reject(jwr);
      }
    });
  });
};

export const watchGames = (): AppThunk<void> => (dispatch) => {
  ioClient.socket.on("game", (subscriptionData: SubscriptionData) => {
    if (subscriptionData.verb === "updated") {
      dispatch(updateGameSuccess(subscriptionData));
    } else if (subscriptionData.verb === "created") {
      dispatch(createGameSuccess(subscriptionData));
    }
  });
};

export const makeMove = (
  gameId: number,
  move: string
): AppThunk<Promise<Game>> => (dispatch) => {
  dispatch(makeMoveRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/game/${gameId}/move/${move}`,
      {},
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          dispatch(makeMoveSuccess(body as Game));
          resolve(body as Game);
        } else {
          dispatch(makeMoveError(body as string));
          reject(jwr);
        }
      }
    );
  });
};

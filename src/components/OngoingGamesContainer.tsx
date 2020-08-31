import React, { FC, useEffect, useReducer, useState } from "react";
import { findIndex } from "lodash";
import { GamePreviewsList } from "./GamePreviewsList";
import Game from "../interfaces/Game";
import { getOngoingGames, watchGames } from "../services/api";
import { SubscriptionData } from "../interfaces/SubscriptionData";

export type OngoingGamesContainerProps = Record<string, unknown>;

interface State {
  games: Game[];
}

type Action =
  | { type: "GET_GAMES"; payload: Game[] }
  | { type: "UPDATE_GAME"; payload: SubscriptionData }
  | { type: "CREATE_GAME"; payload: SubscriptionData };

const initialState: State = {
  games: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_GAMES":
      return {
        games: action.payload,
      };
    case "UPDATE_GAME": {
      const index: number = findIndex(state.games, {
        id: action.payload.id,
      });

      if (index !== -1) {
        return {
          games: state.games.map((item, itemIndex) => {
            if (itemIndex === index) {
              return {
                ...item,
                ...action.payload,
              };
            }
            return item;
          }),
        };
      }
      return state;
    }
    default:
      throw new Error(`unknown action type ${action.type}`);
  }
};

export const OngoingGamesContainer: FC<OngoingGamesContainerProps> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getOngoingGames().then((res) => {
      dispatch({ type: "GET_GAMES", payload: res });
    });

    watchGames((subscriptionData) => {
      if (subscriptionData.verb === "updated") {
        dispatch({ type: "UPDATE_GAME", payload: subscriptionData.data });
      }
    });
  }, []);

  return <GamePreviewsList games={state.games} />;
};

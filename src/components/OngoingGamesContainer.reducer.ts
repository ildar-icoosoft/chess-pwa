import { findIndex } from "lodash";
import Game from "../interfaces/Game";
import { SubscriptionData } from "../interfaces/SubscriptionData";

export interface State {
  games: Game[];
}

export type Action =
  | { type: "GET_GAMES"; payload: Game[] }
  | { type: "UPDATE_GAME"; payload: SubscriptionData }
  | { type: "CREATE_GAME"; payload: SubscriptionData };

export const reducer = (state: State, action: Action): State => {
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
                ...action.payload.previous,
                ...action.payload.data,
              };
            }
            return item;
          }),
        };
      }

      return {
        games: [
          ...state.games,
          {
            ...action.payload.previous,
            ...action.payload.data,
          },
        ],
      };
    }
    case "CREATE_GAME": {
      return {
        games: [...state.games, action.payload.data],
      };
    }
    default:
      throw new Error(`unknown action type ${(action as any).type}`);
  }
};

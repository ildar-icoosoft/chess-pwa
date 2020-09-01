import { findIndex } from "lodash";
import Game from "../../interfaces/Game";

export interface State {
  games: Game[];
}

export type Action =
  | { type: "GET_GAMES"; payload: Game[] }
  | { type: "UPDATE_GAME"; payload: Partial<Game> }
  | { type: "CREATE_GAME"; payload: Game };

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
    case "CREATE_GAME": {
      return {
        games: [...state.games, action.payload],
      };
    }
    default:
      throw new Error(`unknown action type ${(action as any).type}`);
  }
};

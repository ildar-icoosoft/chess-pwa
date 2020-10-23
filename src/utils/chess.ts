import { Move } from "ii-react-chessboard";
import Game from "../interfaces/Game";
import { ChessInstance } from "chess.js";
import makeChessInstance from "./makeChessInstance";

export const isPromotionMove = (game: Game, move: Move) => {
  const chess: ChessInstance = makeChessInstance(game!);
  const moves = chess!.moves({ verbose: true });

  for (let i = 0, movesQnt = moves.length; i < movesQnt; i++) {
    if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === move.from) {
      return true;
    }
  }
  return false;
};

import { Chess, Move as ChessJsMove, PieceType, Square } from "chess.js";
import Game from "../interfaces/Game";

const startPositionFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default (game: Game): string => {
  let { initialFen } = game;
  if (initialFen === "startpos") {
    initialFen = startPositionFen;
  }

  if (!game.moves) {
    return initialFen;
  }

  const chess = new Chess(initialFen);

  game.moves.split(" ").forEach((move) => {
    const result = chess.move(move, {
      sloppy: true,
    });
    if (!result) {
      throw Error(`invalid move ${move}`);
    }
  });

  return chess.fen();
};

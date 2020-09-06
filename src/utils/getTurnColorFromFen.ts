import { Chess } from "chess.js";
import { PieceColor } from "../types/PieceColor";

export default (fen: string): PieceColor => {
  const chess = new Chess(fen);

  return chess.turn() === "w" ? "white" : "black";
};

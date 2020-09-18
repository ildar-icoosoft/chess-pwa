import React, { FC } from "react";
import { ChessInstance } from "chess.js";
import {
  Board,
  getValidMoves,
  Move,
  PieceColor,
  ValidMoves,
} from "ii-react-chessboard";
import Game from "../interfaces/Game";
import makeChessInstance from "../utils/makeChessInstance";
import getTurnColor from "../utils/getTurnColor";
import User from "../interfaces/User";

export interface SingleGameProps {
  game?: Game;
  currentUser?: User;
  onMove?(move: Move): void;
}

export const SingleGame: FC<SingleGameProps> = ({ game, onMove }) => {
  if (!game) {
    return null;
  }

  const chess: ChessInstance = makeChessInstance(game);

  const check: boolean = chess.in_check();

  const fen: string = chess.fen();

  const turnColor: PieceColor =
    getTurnColor(chess) === "white" ? PieceColor.WHITE : PieceColor.BLACK;

  const validMoves: ValidMoves = getValidMoves(chess);

  return (
    <Board
      allowMarkers
      check={check}
      clickable
      draggable
      position={fen}
      turnColor={turnColor}
      validMoves={validMoves}
      viewOnly={game.status !== "started"}
      onMove={onMove}
    />
  );
};

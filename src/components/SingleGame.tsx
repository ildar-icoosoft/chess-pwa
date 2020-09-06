import React, { FC } from "react";
import { Board, Move, PieceColor } from "ii-react-chessboard";
import Game from "../interfaces/Game";
import calculateGameFen from "../utils/calculateGameFen";
import getTurnColorFromFen from "../utils/getTurnColorFromFen";

export interface SingleGameProps {
  game?: Game;
  onMove?(move: Move): void;
}

export const SingleGame: FC<SingleGameProps> = ({ game, onMove }) => {
  if (!game) {
    return null;
  }

  const fen: string = calculateGameFen(game);
  const turnColor: PieceColor =
    getTurnColorFromFen(fen) === "white" ? PieceColor.WHITE : PieceColor.BLACK;

  return (
    <Board
      clickable
      draggable
      position={fen}
      turnColor={turnColor}
      onMove={onMove}
    />
  );
};

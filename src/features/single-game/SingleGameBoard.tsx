import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { Board } from "ii-react-chessboard";
import { ChessInstance } from "chess.js";
import makeChessInstance from "../../utils/makeChessInstance";

export interface SingleGameBoardProps {
  game?: Game;
  rewindToMoveIndex?: number | null;
}

export const SingleGameBoard: FC<SingleGameBoardProps> = ({
  game,
  rewindToMoveIndex,
}) => {
  if (!game) {
    return null;
  }

  const chessWithAllMoves: ChessInstance = makeChessInstance(game);

  const chess: ChessInstance =
    rewindToMoveIndex === null
      ? chessWithAllMoves
      : makeChessInstance(game, rewindToMoveIndex);

  const fen: string = chess.fen();

  const check: boolean = chess.in_check();

  return (
    <Board allowMarkers check={check} clickable draggable position={fen} />
  );
};

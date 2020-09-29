import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { Link } from "react-router-dom";
import { Board } from "ii-react-chessboard";
import makeChessInstance from "../../utils/makeChessInstance";

export interface GamePreviewsListItemProps {
  game?: Game;
}

export const GamePreviewsListItem: FC<GamePreviewsListItemProps> = ({
  game,
}) => {
  if (!game) {
    return null;
  }

  const fen: string = makeChessInstance(game).fen();

  return (
    <Link to={`/game/${game.id}`}>
      <Board position={fen} viewOnly={false} width={240} />
    </Link>
  );
};

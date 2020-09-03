import React, { FC, useEffect, useState } from "react";
import { Board } from "ii-react-chessboard";
import { getGame } from "../services/api";
import Game from "../interfaces/Game";
import calculateGameFen from "../utils/calculateGameFen";

export interface GameContainerProps {
  id: number;
}

export const GameContainer: FC<GameContainerProps> = ({ id }) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    getGame(id)
      .then((res) => setGame(res))
      .catch(() => {});
  }, [id]);

  if (game) {
    const fen: string = calculateGameFen(game);

    return <Board position={fen} />;
  }
  return null;
};

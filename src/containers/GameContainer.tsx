import React, { FC } from "react";
import { Board } from "ii-react-chessboard";

export type GameContainerProps = Record<string, unknown>;

export const GameContainer: FC<GameContainerProps> = () => {
  return <Board />;
};

import React from "react";
import { FC } from "react";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";

export interface GameClockProps {
  game?: Game;
  turnColor?: PieceColor;
  color?: PieceColor;
}

export const GameClock: FC<GameClockProps> = () => {
  return null;
};

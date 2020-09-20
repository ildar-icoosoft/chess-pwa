import React from "react";
import Game from "../../interfaces/Game";
import { FC } from "react";
import { PieceColor } from "../../types/PieceColor";
import { GameClock } from "./GameClock";

export interface GameControlPanelProps {
  game?: Game;
  turnColor?: PieceColor;
  orientation?: PieceColor;
}

export const GameControlPanel: FC<GameControlPanelProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  return (
    <div>
      <GameClock />
      <GameClock />
    </div>
  );
};

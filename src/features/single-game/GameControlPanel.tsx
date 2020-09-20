import React from "react";
import Game from "../../interfaces/Game";
import { FC } from "react";
import { PieceColor } from "../../types/PieceColor";
import { GameClock } from "./GameClock";
import { GameMoves } from "./GameMoves";
import { GameControlPanelUserName } from "./GameControlPanelUserName";
import { GameControlPanelTopToolbar } from "./GameControlPanelTopToolbar";
import { GameControlPanelBottomToolbar } from "./GameControlPanelBottomToolbar";

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
      <GameControlPanelUserName />
      <GameControlPanelTopToolbar />
      <GameMoves />
      <GameControlPanelBottomToolbar />
      <GameControlPanelUserName />
      <GameClock />
    </div>
  );
};

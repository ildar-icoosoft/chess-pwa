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
  orientation?: PieceColor;
}

export const GameControlPanel: FC<GameControlPanelProps> = ({
  game,
  orientation = "white",
}) => {
  if (!game) {
    return null;
  }

  return (
    <div>
      <GameClock time={orientation === "white" ? game.btime : game.wtime} />
      <GameControlPanelUserName />
      <GameControlPanelTopToolbar />
      <GameMoves />
      <GameControlPanelBottomToolbar />
      <GameControlPanelUserName />
      <GameClock time={orientation === "white" ? game.wtime : game.btime} />
    </div>
  );
};

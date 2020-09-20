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

export const GameControlPanel: FC<GameControlPanelProps> = ({
  game,
  turnColor = "white",
  orientation = "white",
}) => {
  if (!game) {
    return null;
  }

  return (
    <div>
      <GameClock
        game={game}
        turnColor={turnColor}
        color={orientation === "white" ? "black" : "white"}
      />
      <GameControlPanelUserName />
      <GameControlPanelTopToolbar />
      <GameMoves />
      <GameControlPanelBottomToolbar />
      <GameControlPanelUserName />
      <GameClock
        game={game}
        turnColor={turnColor}
        color={orientation === "white" ? "white" : "black"}
      />
    </div>
  );
};

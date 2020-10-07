import React, { FC } from "react";
import Game from "../../interfaces/Game";
import getGameStatusText from "../../utils/getGameStatusText";

export interface GameControlPanelStatusProps {
  game?: Game;
}

export const GameControlPanelStatus: FC<GameControlPanelStatusProps> = ({
  game,
}) => {
  if (!game) {
    return null;
  }

  let result = "½-½";
  if (game.winner) {
    if (game.winner === "white") {
      result = "1-0";
    } else {
      result = "0-1";
    }
  }

  return (
    <>
      <div data-testid="game-status">{getGameStatusText(game)}</div>
      <div data-testid="game-result">{result}</div>
    </>
  );
};

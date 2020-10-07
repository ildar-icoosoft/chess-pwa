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

  return (
    <>
      <div data-testid="game-status">{getGameStatusText(game)}</div>
    </>
  );
};

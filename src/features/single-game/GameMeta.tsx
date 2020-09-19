import React, { FC } from "react";
import Game from "../../interfaces/Game";
import getGameStatusText from "../../utils/getGameStatusText";

export interface GameMetaProps {
  game?: Game;
}

export const GameMeta: FC<GameMetaProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  return <div>{getGameStatusText(game)}</div>;
};

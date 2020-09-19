import React, { FC } from "react";
import Game from "../../interfaces/Game";

export interface GameMetaProps {
  game?: Game;
}

export const GameMeta: FC<GameMetaProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  return <div></div>;
};

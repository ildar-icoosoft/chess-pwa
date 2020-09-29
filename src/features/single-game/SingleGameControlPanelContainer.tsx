import React, { FC } from "react";
import { useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { GameControlPanel } from "./GameControlPanel";

export interface SingleGameControlPanelContainerProps {
  id: number;
}

export const SingleGameControlPanelContainer: FC<SingleGameControlPanelContainerProps> = ({
  id,
}) => {
  const game = useSelector((state: RootState) =>
    denormalize(id, gameSchema, state.entities)
  );

  if (game) {
    return <GameControlPanel game={game} />;
  }
  return null;
};

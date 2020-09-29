import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { denormalize } from "normalizr";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { GameMeta } from "./GameMeta";

export interface SinglGameMetaContainerProps {
  id: number;
}

export const SingleGameMetaContainer: FC<SinglGameMetaContainerProps> = ({
  id,
}) => {
  const game = useSelector((state: RootState) =>
    denormalize(id, gameSchema, state.entities)
  );

  if (game) {
    return <GameMeta game={game} />;
  }
  return null;
};

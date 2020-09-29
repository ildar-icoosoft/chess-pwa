import React, { FC } from "react";
import { useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { SingleGameBoard } from "./SingleGameBoard";

export interface SingleGameBoardProps {
  id: number;
}

export const SingleGameBoardContainer: FC<SingleGameBoardProps> = ({ id }) => {
  const game = useSelector((state: RootState) =>
    denormalize(id, gameSchema, state.entities)
  );

  if (game) {
    return <SingleGameBoard game={game} />;
  }
  return null;
};

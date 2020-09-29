import React, { FC } from "react";
import { useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { SingleGameControlPanelWrapper } from "./SingleGameControlPanelWrapper";
import User from "../../interfaces/User";
import userSchema from "../../normalizr/schemas/userSchema";
import { SingleGame } from "./SingleGame";
import { defaultSingleGameItemState } from "./singleGameSlice";

export interface SingleGameControlPanelContainerProps {
  id: number;
}

export const SingleGameControlPanelContainer: FC<SingleGameControlPanelContainerProps> = ({
  id,
}) => {
  const game = useSelector((state: RootState) =>
    denormalize(id, gameSchema, state.entities)
  );

  const singleGameItemState =
    useSelector((state: RootState) => state.singleGame[id]) ||
    defaultSingleGameItemState;

  const currentUser: User | undefined = useSelector((state: RootState) => {
    if (state.currentUser.userId) {
      return denormalize(state.currentUser.userId, userSchema, state.entities);
    }
    return undefined;
  });

  if (game) {
    return (
      <SingleGameControlPanelWrapper
        game={game}
        currentUser={currentUser}
        isFlipped={singleGameItemState.isFlipped}
        rewindToMoveIndex={singleGameItemState.rewindToMoveIndex}
      />
    );
  }
  return null;
};

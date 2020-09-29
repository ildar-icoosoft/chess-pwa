import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { SingleGameControlPanelWrapper } from "./SingleGameControlPanelWrapper";
import User from "../../interfaces/User";
import userSchema from "../../normalizr/schemas/userSchema";
import { defaultSingleGameItemState, flipBoard } from "./singleGameSlice";
import { AppDispatch } from "../../app/store";

export interface SingleGameControlPanelContainerProps {
  id: number;
}

export const SingleGameControlPanelContainer: FC<SingleGameControlPanelContainerProps> = ({
  id,
}) => {
  const dispatch = useDispatch<AppDispatch>();

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

  const handleFlipBoard = useCallback(() => {
    dispatch(flipBoard(id));
  }, [dispatch, id]);

  if (game) {
    return (
      <SingleGameControlPanelWrapper
        game={game}
        currentUser={currentUser}
        isFlipped={singleGameItemState.isFlipped}
        rewindToMoveIndex={singleGameItemState.rewindToMoveIndex}
        onFlipBoard={handleFlipBoard}
      />
    );
  }
  return null;
};

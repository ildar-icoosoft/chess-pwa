import React, { FC } from "react";
import { denormalize } from "normalizr";
import { useSelector } from "react-redux";
import { GamePreviewsList } from "./GamePreviewsList";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";

const OngoingGamesContainer: FC<unknown> = () => {
  const items = useSelector((state: RootState) =>
    denormalize(state.gamesList.items, [gameSchema], state.entities)
  );

  return <GamePreviewsList games={items} />;
};

export default OngoingGamesContainer;

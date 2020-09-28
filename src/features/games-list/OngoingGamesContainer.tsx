import React, { FC, useEffect } from "react";
import { denormalize } from "normalizr";
import { useDispatch, useSelector } from "react-redux";
import { GamePreviewsList } from "./GamePreviewsList";
import { RootState } from "../../app/rootReducer";
import { fetchGames } from "./gamesListSlice";
import gameSchema from "../../normalizr/schemas/gameSchema";

const OngoingGamesContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) =>
    denormalize(state.gamesList.items, [gameSchema], state.entities)
  );

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return <GamePreviewsList games={items} />;
};

export default OngoingGamesContainer;

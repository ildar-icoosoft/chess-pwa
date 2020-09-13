import React, { FC, useEffect } from "react";
import { denormalize } from "normalizr";
import { useDispatch, useSelector } from "react-redux";
import { GamePreviewsList } from "../components/GamePreviewsList";
import { RootState } from "../app/rootReducer";
import { fetchGames } from "../redux/slices/gamesSlice";
import gameSchema from "../redux/schemas/gameSchema";

const OngoingGamesContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) =>
    denormalize(state.games.items, [gameSchema], state.entities)
  );

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return <GamePreviewsList games={items} />;
};

export default OngoingGamesContainer;

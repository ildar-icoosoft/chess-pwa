/* eslint-disable import/prefer-default-export */

import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GamePreviewsList } from "../components/GamePreviewsList";
import { RootState } from "../app/rootReducer";
import { fetchGames, watchGames } from "../slices/gamesSlice";

export const OngoingGamesContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    dispatch(fetchGames());
    dispatch(watchGames());
  }, [dispatch]);

  return <GamePreviewsList games={items} />;
};

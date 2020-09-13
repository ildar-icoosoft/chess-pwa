import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GamePreviewsList } from "../components/GamePreviewsList";
import { RootState } from "../app/rootReducer";
import { fetchGames } from "../redux/slices/gamesSlice";

const OngoingGamesContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return <GamePreviewsList games={items} />;
};

export default OngoingGamesContainer;

import React, { FC, useEffect } from "react";
import { Move } from "ii-react-chessboard";
import { SingleGame } from "../components/SingleGame";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { RootState } from "../app/rootReducer";
import {
  fetchGame,
  fetchGames,
  makeMove,
  watchGames,
} from "../redux/slices/gamesSlice";

export interface SingleGameContainerProps {
  id: number;
}

export const SingleGameContainer: FC<SingleGameContainerProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const game = useSelector((state: RootState) =>
    state.games.items.find((item) => item.id === id)
  );

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  const onMove = (move: Move) => {
    dispatch(makeMove(id, `${move.from}${move.to}`));
  };

  if (game) {
    return <SingleGame game={game} onMove={onMove} />;
  }
  return null;
};

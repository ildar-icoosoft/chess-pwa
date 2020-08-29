import React, { FC, useEffect, useState } from "react";
import { GamePreviewsList } from "./GamePreviewsList";
import Game from "../interfaces/Game";

export interface OngoingGamesContainerProps {
  [key: string]: any;
}

export const OngoingGamesContainer: FC<OngoingGamesContainerProps> = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setGames([
        {
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 2,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ]);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return <GamePreviewsList games={games} />;
};

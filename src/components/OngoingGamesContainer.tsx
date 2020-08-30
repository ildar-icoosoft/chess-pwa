import React, { FC, useEffect, useState } from "react";
import { GamePreviewsList } from "./GamePreviewsList";
import Game from "../interfaces/Game";
import { getOngoingGames } from "../services/api";

export interface OngoingGamesContainerProps {
  onLoad?: () => void;
}

export const OngoingGamesContainer: FC<OngoingGamesContainerProps> = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getOngoingGames().then((res) => {
      setGames(res);
    });
  }, []);

  return <GamePreviewsList games={games} />;
};

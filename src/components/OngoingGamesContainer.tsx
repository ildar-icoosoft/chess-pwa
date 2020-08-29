import React, { FC } from "react";
import { GamePreviewsList } from "./GamePreviewsList";

export interface OngoingGamesContainerProps {
  [key: string]: any;
}

export const OngoingGamesContainer: FC<OngoingGamesContainerProps> = () => {
  return <GamePreviewsList />;
};

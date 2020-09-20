import React from "react";
import { GamePreviewsList } from "../features/ongoing-games/GamePreviewsList";
import Game from "../interfaces/Game";

export default {
  title: "Game Previews List",
};

const games: Game[] = [
  {
    id: 1,
    createdAt: 1600550685503,
    updatedAt: 1600552247463,
    aiLevel: 3,
    clockLimit: 300,
    clockIncrement: 3,
    initialFen: "startpos",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
    winner: null,
  },
  {
    id: 2,
    createdAt: 1600550685503,
    updatedAt: 1600552247463,
    aiLevel: 3,
    clockLimit: 300,
    clockIncrement: 3,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
    winner: null,
  },
];

export const GamePreviews = () => <GamePreviewsList games={games} />;

GamePreviews.story = {
  parameters: {
    jest: ["GamePreviewsList"],
  },
};

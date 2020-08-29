/* eslint-disable import/prefer-default-export */

import Game from "../../interfaces/Game";

export const getOngoingGames = (): Promise<Game[]> => {
  return Promise.resolve([
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
  ]);
};

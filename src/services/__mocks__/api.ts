/* eslint-disable import/prefer-default-export */

import Game from "../../interfaces/Game";
import { SubscriptionData } from "../../interfaces/SubscriptionData";

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
        {
          id: 3,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ]);
    }, 1000);
  });
};

export const watchGames = (cb: (data: SubscriptionData) => void) => {
  setTimeout(() => {
    cb({
      verb: "updated",
      data: {
        id: 1,
        moves: "e2e4",
      },
      id: 1,
    });
  }, 2000);
};

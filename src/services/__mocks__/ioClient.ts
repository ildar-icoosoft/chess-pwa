import { SubscriptionData } from "../../interfaces/SubscriptionData";

export default {
  socket: {
    get(url: string, cb: any) {
      setTimeout(() => {
        cb([
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
      }, 0);
    },
    on(path: string, cb: (data: SubscriptionData) => void) {
      setTimeout(() => {
        cb({
          verb: "updated",
          data: {
            id: 2,
            moves: "e2e4",
          },
          id: 2,
        });
      }, 0);
    },
  },
};

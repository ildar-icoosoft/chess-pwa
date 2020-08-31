import Game from "../../interfaces/Game";
import { getOngoingGames, watchGames } from "../api";
import { SubscriptionData } from "../../interfaces/SubscriptionData";

jest.mock("../ioClient");

const gamesBeforeChange: Game[] = [
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
];

describe("api service", () => {
  it("getOngoingGames()", () => {
    return expect(getOngoingGames()).resolves.toEqual(gamesBeforeChange);
  });

  it("watchGames()", () => {
    return new Promise((resolve) => {
      watchGames((data: SubscriptionData) => {
        expect(data).toEqual({
          verb: "updated",
          data: {
            id: 2,
            moves: "e2e4",
          },
          id: 2,
        });
        resolve();
      });
    });
  });
});

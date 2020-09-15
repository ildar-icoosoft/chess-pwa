import Game from "../../interfaces/Game";

export const gameWithoutMoves: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
};

export const gameWithMoves: Game = {
  id: 2,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1g3", // g1g3 is incorrect move and must be ignored
  status: "started",
  white: null,
  black: null,
};

import { ValidMoves } from "ii-react-chessboard";
import Game from "../../interfaces/Game";
import NormalizedGameEntity from "../../normalizr/interfaces/NormalizedGameEntity";

export const gameSample1: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 310000,
  btime: 365000,
  moves: "",
  status: "started",
  white: null,
  black: null,
  winner: null,
};
export const gameSample1Fen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const normalizedGameSample1: NormalizedGameEntity = gameSample1 as NormalizedGameEntity;

export const gameSample2: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
  winner: null,
};

export const normalizedGameSample2: NormalizedGameEntity = gameSample2 as NormalizedGameEntity;

export const gameSample3: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 600,
  clockIncrement: 5,
  createdAt: 0,
  drawOffer: null,
  initialFen: "8/4p3/8/5k2/8/3p4/4PP2/4K3 w KQkq - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
  winner: null,
};

export const normalizedGameSample3: NormalizedGameEntity = gameSample3 as NormalizedGameEntity;

export const gameSample3ValidMoves: ValidMoves = {
  e1: ["d2", "f1", "d1", "g1", "c1"],
  e2: ["e3", "e4", "d3"],
  f2: ["f3", "f4"],
};

// @todo. use this function to create samples.
export const makeGameSample = (
  data: Partial<Game>,
  originalGameSample = gameSample1
): Game => ({
  ...originalGameSample,
  ...data,
});

// with black user
export const gameSample2_: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: {
    id: 1,
    fullName: "Thomas Miller",
  },
  winner: null,
};

// with white user
export const gameSample3_: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: {
    id: 1,
    fullName: "Thomas Miller",
  },
  black: null,
  winner: null,
};

export const gameWithMovesSample: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1f3 g8f6",
  status: "started",
  white: null,
  black: null,
  winner: null,
};
export const gameWithMovesAndUserSample: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1f3 g8f6",
  status: "started",
  white: {
    id: 1,
    fullName: "Thomas Miller",
  },
  black: null,
  winner: null,
};
export const gameWithMovesAndUserVsUserSample: Game = {
  id: 2,
  aiLevel: 0,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1f3 g8f6",
  status: "started",
  white: {
    id: 1,
    fullName: "Thomas Miller",
  },
  black: {
    id: 2,
    fullName: "William Garcia",
  },
  winner: null,
};

export const gameThatCanBeAbortedSample: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "black",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4",
  status: "started",
  white: null,
  black: {
    id: 1,
    fullName: "Thomas Miller",
  },
  winner: null,
};

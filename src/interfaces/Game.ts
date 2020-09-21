import GameStatus from "../types/GameStatus";
import User from "./User";
import { PieceColor } from "../types/PieceColor";

export default interface Game {
  id: number;
  createdAt: number;
  updatedAt: number;
  aiLevel: number;
  clockLimit: number;
  clockIncrement: number;
  initialFen: string;
  turn: PieceColor;
  wtime: number;
  btime: number;
  moves: string;
  status: GameStatus;
  white: User | null;
  black: User | null;
  winner: PieceColor | null;
}

import Game from "../../interfaces/Game";

export default interface NormalizedGameEntity
  extends Omit<Game, "white" | "black"> {
  white: number;
  black: number;
}

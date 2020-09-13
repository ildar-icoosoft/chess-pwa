import Game from "../../../interfaces/Game";
import { NormalizedUserEntity } from "./user";

export interface NormalizedGameEntity extends Game {}

export interface NormalizedGameItem {
  entities: {
    games: {
      [id: string]: NormalizedGameEntity;
    };
  };
  result: string;
}

export interface NormalizedGamesList {
  entities: {
    games?: {
      [id: string]: NormalizedGameEntity;
    };
    users?: {
      [id: string]: NormalizedUserEntity;
    };
  };
  result: number[];
}

import { Seek } from "../../interfaces/Seek";
import userSample1 from "./user";
import { gameSample1 } from "./game";
import NormalizedSeekEntity from "../../normalizr/interfaces/NormalizedSeekEntity";

export const defaultSeekSample: Seek = {
  id: 1,
  color: "white",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: userSample1,
  game: null,
};

export const normalizedDefaultSeekSample: NormalizedSeekEntity = {
  id: 1,
  color: "white",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: 1,
  game: null,
};

export const seekSample2: Seek = {
  id: 2,
  color: "black",
  clockLimit: 600,
  createdAt: 0,
  clockIncrement: 3,
  createdBy: userSample1,
  game: gameSample1,
};

export const seekSample3: Seek = {
  id: 2,
  color: "random",
  clockLimit: 600,
  createdAt: 0,
  clockIncrement: 3,
  createdBy: userSample1,
  game: gameSample1,
};

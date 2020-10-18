import { Seek } from "../../interfaces/Seek";
import userSample1 from "./user";
import { gameSample1 } from "./game";
import NormalizedSeekEntity from "../../normalizr/interfaces/NormalizedSeekEntity";
import Game from "../../interfaces/Game";

export const seekSample1: Seek = {
  id: 1,
  color: "white",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: userSample1,
  game: null,
};

export const normalizedSeekSample1: NormalizedSeekEntity = {
  id: 1,
  color: "white",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: 1,
  game: null,
};

// @todo. use this functions to create samples.
export const makeSeekSample = (
  data: Partial<Seek>,
  originalSeekSample = seekSample1
): Seek => ({
  ...originalSeekSample,
  ...data,
});

export const makeNormalizedSeekSample = (
  data: Partial<NormalizedSeekEntity>,
  originalSeekSample = normalizedSeekSample1
): NormalizedSeekEntity => ({
  ...originalSeekSample,
  ...data,
});

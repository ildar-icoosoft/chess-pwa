import User from "../../interfaces/User";
import NormalizedUserEntity from "../../normalizr/interfaces/NormalizedUserEntity";

export const userSample1: User = {
  id: 1,
  createdAt: 0,
  fullName: "Thomas Miller",
  isOnline: true,
};
export const normalizedUserSample1: NormalizedUserEntity = userSample1;

export const userSample2: User = {
  id: 2,
  createdAt: 1,
  fullName: "Robert Johnson",
  isOnline: false,
};
export const normalizedUserSample2: NormalizedUserEntity = userSample2;

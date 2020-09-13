import User from "../../../interfaces/User";

export interface NormalizedUserEntity extends User {}

export interface NormalizedUserItem {
  entities: {
    users: {
      [id: string]: NormalizedUserEntity;
    };
  };
  result: number;
}

export interface NormalizedUsersList {
  entities: {
    users?: {
      [id: string]: NormalizedUserEntity;
    };
  };
  result: number[];
}

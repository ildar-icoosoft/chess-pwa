/* eslint-disable @typescript-eslint/no-explicit-any */

import dataSubscriptionReducer, {
  updateGameBySubscription,
  createGameBySubscription,
  updateSeekBySubscription,
  createSeekBySubscription,
  removeSeekBySubscription,
  updateUserBySubscription,
  createUserBySubscription,
  watchGames,
  watchSeeks,
  watchUsers,
} from "../dataSubscriptionSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import {
  normalizedUserSample1,
  userSample1,
} from "../../../test-utils/data-sample/user";

jest.mock("../../../services/ioClient");

describe("dataSubscriptionSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      dataSubscriptionReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle updateGameBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: updateGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createGameBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: createGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  describe("should handle watchGames", () => {
    it("update game", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            previous: {
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "",
              status: "started",
              white: null,
              black: null,
            },
            data: {
              id: 1,
              moves: "e2e4",
            },
            id: 1,
          });
        }
      );

      watchGames()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: updateGameBySubscription.type,
        payload: {
          result: 1,
          entities: {
            games: {
              1: {
                id: 1,
                initialFen: "startpos",
                wtime: 300000,
                btime: 300000,
                moves: "e2e4",
                status: "started",
                white: null,
                black: null,
              },
            },
          },
        },
      });
    });

    it("create game", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: {
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "e2e4",
              status: "started",
              white: null,
              black: null,
            },
            id: 1,
          });
        }
      );

      watchGames()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: createGameBySubscription.type,
        payload: {
          result: 1,
          entities: {
            games: {
              1: {
                id: 1,
                initialFen: "startpos",
                wtime: 300000,
                btime: 300000,
                moves: "e2e4",
                status: "started",
                white: null,
                black: null,
              },
            },
          },
        },
      });
    });
  });

  it("should handle updateSeekBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: updateSeekBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createSeekBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: createSeekBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  describe("should handle watchSeeks", () => {
    it("update seek", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            previous: {
              id: 1,
              color: "white",
              clockLimit: 300,
              createdAt: 0,
              clockIncrement: 5,
              createdBy: 1,
              game: null,
            },
            data: {
              id: 1,
              game: 1,
            },
            id: 1,
          });
        }
      );

      watchSeeks()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: updateSeekBySubscription.type,
        payload: {
          result: 1,
          entities: {
            seeks: {
              1: {
                id: 1,
                color: "white",
                clockLimit: 300,
                createdAt: 0,
                clockIncrement: 5,
                createdBy: 1,
                game: 1,
              },
            },
          },
        },
      });
    });

    it("create seek", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: {
              id: 1,
              color: "white",
              clockLimit: 300,
              createdAt: 0,
              clockIncrement: 5,
              createdBy: 1,
              game: null,
            },
            id: 1,
          });
        }
      );

      watchSeeks()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: createSeekBySubscription.type,
        payload: {
          result: 1,
          entities: {
            seeks: {
              1: {
                id: 1,
                color: "white",
                clockLimit: 300,
                createdAt: 0,
                clockIncrement: 5,
                createdBy: 1,
                game: null,
              },
            },
          },
        },
      });
    });

    it("remove seek", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "destroyed",
            previous: {
              id: 1,
              color: "white",
              clockLimit: 300,
              createdAt: 0,
              clockIncrement: 5,
              createdBy: 1,
              game: null,
            },
            id: 1,
          });
        }
      );

      watchSeeks()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: removeSeekBySubscription.type,
        payload: 1,
      });
    });
  });

  it("should handle updateUserBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: updateUserBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createUserBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: createUserBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  describe("should handle watchUsers", () => {
    it("update user", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            previous: userSample1,
            data: {
              id: 1,
              fullName: "changed user name",
            },
            id: 1,
          });
        }
      );

      watchUsers()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: updateUserBySubscription.type,
        payload: {
          result: 1,
          entities: {
            users: {
              1: {
                ...normalizedUserSample1,
                fullName: "changed user name",
              },
            },
          },
        },
      });
    });

    it("create user", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: userSample1,
            id: 1,
          });
        }
      );

      watchUsers()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: createUserBySubscription.type,
        payload: {
          result: 1,
          entities: {
            users: {
              1: normalizedUserSample1,
            },
          },
        },
      });
    });
  });
});

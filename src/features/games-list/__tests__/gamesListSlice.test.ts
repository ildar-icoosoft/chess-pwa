import { JWR, RequestCallback } from "sails.io.js";
import gamesListReducer, {
  getGamesListRequest,
  getGamesListSuccess,
  getGamesListError,
  fetchGames,
} from "../gamesListSlice";
import { challengeAiSuccess } from "../../challenge/challengeSlice";
import ioClient from "../../../services/ioClient";
import {
  createGameBySubscription,
  updateGameBySubscription,
} from "../../data-subscription/dataSubscriptionSlice";
import { defaultState } from "../../../test-utils/data-sample/state";
import { gameSample } from "../../../test-utils/data-sample/game";

jest.mock("../../../services/ioClient");

describe("gamesListSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      gamesListReducer(undefined, {
        type: "",
      })
    ).toEqual({
      items: [],
      isLoading: true,
      error: null,
    });
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: challengeAiSuccess.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 1],
      isLoading: true,
      error: "error text",
    });

    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: challengeAiSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle createGameBySubscription", () => {
    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: createGameBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 1],
      isLoading: true,
      error: "error text",
    });

    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: createGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle updateGameBySubscription", () => {
    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: updateGameBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 1],
      isLoading: true,
      error: "error text",
    });

    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: updateGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle getGamesListRequest", () => {
    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: false,
          error: "error text",
        },
        {
          type: getGamesListRequest.type,
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: null,
    });
  });

  it("should handle getGamesListSuccess", () => {
    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: getGamesListSuccess.type,
          payload: {
            result: [2, 3],
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 3],
      isLoading: false,
      error: null,
    });
  });

  it("should handle getGamesListError", () => {
    expect(
      gamesListReducer(
        {
          items: [1],
          isLoading: true,
          error: null,
        },
        {
          type: getGamesListError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      items: [1],
      isLoading: false,
      error: "error text",
    });
  });

  describe("should handle fetchGames", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb([gameSample], {
            body: [gameSample],
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchGames()(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual([gameSample]);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getGamesListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getGamesListSuccess.type,
        payload: {
          result: [1],
          entities: {
            games: {
              "1": gameSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("internal server error", {
            body: "internal server error",
            statusCode: 500,
          } as JWR);
        }
      );

      const result = fetchGames()(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getGamesListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getGamesListError.type,
        payload: "internal server error",
      });
    });
  });
});

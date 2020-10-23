import chatReducer, {
  getChatMessagesListRequest,
  getChatMessagesListSuccess,
  getChatMessagesListError,
  fetchChatMessages,
} from "../chatSlice";
import ioClient from "../../../services/ioClient";
import { JWR, RequestCallback } from "sails.io.js";
import { defaultState } from "../../../test-utils/data-sample/state";
import { normalizedUserSample1 } from "../../../test-utils/data-sample/user";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";
import {
  chatMessageSample1,
  normalizedChatMessageSample1,
} from "../../../test-utils/data-sample/chat-message";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("chatSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      chatReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle getChatMessagesListRequest", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: getChatMessagesListRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      1: {
        isLoading: true,
        error: null,
        items: [1, 2],
      },
    });

    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: getChatMessagesListRequest.type,
          payload: 2,
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [1, 2],
      },
      2: {
        isLoading: true,
        error: null,
        items: [],
      },
    });
  });

  it("should handle getChatMessagesListSuccess", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: true,
            error: "error text",
            items: [3, 4],
          },
          2: {
            isLoading: true,
            error: "error text",
            items: [5, 6],
          },
        },
        {
          type: getChatMessagesListSuccess.type,
          payload: {
            gameId: 1,
            normalizedChatMessages: {
              result: [7, 8],
              entities: {},
            },
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: null,
        items: [7, 8],
      },
      2: {
        isLoading: true,
        error: "error text",
        items: [5, 6],
      },
    });
  });

  it("should handle getChatMessagesListError", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: true,
            error: null,
            items: [1, 2],
          },
        },
        {
          type: getChatMessagesListError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [],
      },
    });
  });

  describe("should handle fetchChatMessages", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb([chatMessageSample1], {
            body: [chatMessageSample1],
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchChatMessages(3)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual([chatMessageSample1]);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getChatMessagesListRequest.type,
        payload: 3,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getChatMessagesListSuccess.type,
        payload: {
          gameId: 3,
          normalizedChatMessages: {
            result: [1],
            entities: {
              chatMessages: {
                1: normalizedChatMessageSample1,
              },
              users: {
                1: normalizedUserSample1,
              },
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
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = fetchChatMessages(3)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getChatMessagesListRequest.type,
        payload: 3,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getChatMessagesListError.type,
        payload: {
          itemId: 3,
          error: "error text",
        },
      });
    });
  });
});

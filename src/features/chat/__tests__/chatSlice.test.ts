import chatReducer, {
  getChatMessagesListRequest,
  getChatMessagesListSuccess,
  getChatMessagesListError,
} from "../chatSlice";

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
});

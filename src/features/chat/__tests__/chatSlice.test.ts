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
});

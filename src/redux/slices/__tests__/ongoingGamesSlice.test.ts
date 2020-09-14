import ongoingGamesReducer, {
  getOngoingGamesRequest,
  getOngoingGamesSuccess,
  getOngoingGamesError,
} from "../ongoingGamesSlice";

describe("ongoingGamesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      ongoingGamesReducer(undefined, {
        type: "",
      })
    ).toEqual({
      items: [],
      isLoading: true,
      error: null,
    });
  });

  it("should handle getOngoingGamesRequest", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: false,
          error: "error text",
        },
        {
          type: getOngoingGamesRequest.type,
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: null,
    });
  });

  it("should handle getOngoingGamesSuccess", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: getOngoingGamesSuccess.type,
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

  it("should handle getOngoingGamesError", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: null,
        },
        {
          type: getOngoingGamesError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      items: [1],
      isLoading: false,
      error: "error text",
    });
  });
});

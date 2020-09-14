import singleGameReducer, {
  getSingleGameRequest,
  getSingleGameSuccess,
  getSingleGameError,
} from "../singleGameSlice";

describe("singleGameSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      singleGameReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle getSingleGameRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
          },
        },
        {
          type: getSingleGameRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
          },
        },
        {
          type: getSingleGameRequest.type,
          payload: 2,
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
      },
      "2": {
        isLoading: true,
        error: null,
      },
    });
  });

  it("should handle getSingleGameSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: "error text",
          },
        },
        {
          type: getSingleGameSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: null,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: "error text",
          },
        },
        {
          type: getSingleGameSuccess.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: "error text",
      },
      "2": {
        isLoading: false,
        error: null,
      },
    });
  });

  it("should handle getSingleGameError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
          },
        },
        {
          type: getSingleGameError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
          },
        },
        {
          type: getSingleGameError.type,
          payload: {
            itemId: 2,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
      },
      "2": {
        isLoading: false,
        error: "error text",
      },
    });
  });
});

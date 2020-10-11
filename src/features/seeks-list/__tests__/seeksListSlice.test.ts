import seeksListReducer, {
  getSeeksListRequest,
  getSeeksListSuccess,
  getSeeksListError,
} from "../seeksListSlice";

jest.mock("../../../services/ioClient");

describe("seeksListSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      seeksListReducer(undefined, {
        type: "",
      })
    ).toEqual({
      isLoading: true,
      error: null,
      items: [],
    });
  });

  it("should handle getSeeksListRequest", () => {
    expect(
      seeksListReducer(
        {
          isLoading: false,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getSeeksListRequest.type,
        }
      )
    ).toEqual({
      isLoading: true,
      error: null,
      items: [1, 2],
    });
  });

  it("should handle getSeeksListSuccess", () => {
    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getSeeksListSuccess.type,
          payload: {
            result: [2, 3],
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: false,
      error: null,
      items: [2, 3],
    });
  });

  it("should handle getSeeksListError", () => {
    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: null,
          items: [1, 2],
        },
        {
          type: getSeeksListError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      isLoading: false,
      error: "error text",
      items: [],
    });
  });
});

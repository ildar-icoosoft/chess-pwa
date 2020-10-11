import seeksListReducer from "../seeksListSlice";

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
});

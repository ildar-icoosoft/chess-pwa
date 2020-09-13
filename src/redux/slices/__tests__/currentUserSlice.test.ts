import currentUserSlice from "../currentUserSlice";

describe("currentUserSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      currentUserSlice(undefined, {
        type: "",
      })
    ).toEqual({ error: null, isLoading: true, userId: null });
  });
});

import gameClockReducer, {
  increment1Sec,
} from "../../game-clock/gameClockSlice";

describe("gameClockSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      gameClockReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle challengeAiRequest", () => {
    expect(
      gameClockReducer(
        {},
        {
          type: increment1Sec.type,
        }
      )
    ).toEqual({});
  });
});

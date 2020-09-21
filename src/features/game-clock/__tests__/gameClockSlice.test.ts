import gameClockReducer, {
  increment1Sec,
  startGameClock,
} from "../../game-clock/gameClockSlice";
import { defaultState } from "../../../test-utils/data-sample/state";

jest.useFakeTimers();

describe("gameClockSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      gameClockReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle increment1Sec", () => {
    expect(
      gameClockReducer(
        {},
        {
          type: increment1Sec.type,
        }
      )
    ).toEqual({});
  });

  it("should handle startGameClock", () => {
    const dispatch = jest.fn();

    const result = startGameClock()(dispatch, () => defaultState, null);

    expect(result).toBeUndefined();

    expect(dispatch).toBeCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: increment1Sec.type,
    });

    jest.advanceTimersByTime(1000);
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: increment1Sec.type,
    });
  });
});

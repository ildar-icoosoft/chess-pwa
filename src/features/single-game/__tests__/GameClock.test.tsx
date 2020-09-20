import { render, act } from "@testing-library/react";
import React, { useEffect } from "react";
import { GameClock } from "../GameClock";
import {
  gameSample,
  gameWithCheckmateByWhiteSample,
} from "../../../test-utils/data-sample/game";

jest.useFakeTimers();

describe("GameClock", () => {
  beforeEach(() => {
    (useEffect as jest.Mock).mockReset();
  });

  describe("DOM structure", () => {
    it("should display time", () => {
      const { rerender, getByTestId } = render(<GameClock game={gameSample} />);

      expect(getByTestId("time").innerHTML).toBe("05 : 10");

      rerender(<GameClock game={gameSample} color={"black"} />);
      expect(getByTestId("time").innerHTML).toBe("06 : 05");
    });

    it("should update time if game is playing", () => {
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const { getByTestId } = render(<GameClock game={gameSample} />);

      expect(getByTestId("time").innerHTML).toBe("05 : 10");

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId("time").innerHTML).toBe("05 : 08");
    });

    it("should not update time if game is not playing", () => {
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const { getByTestId } = render(
        <GameClock game={gameWithCheckmateByWhiteSample} />
      );

      expect(getByTestId("time").innerHTML).toBe("05 : 00");

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId("time").innerHTML).toBe("05 : 00");
    });

    it("should contain nothing if no game", () => {
      const { container } = render(<GameClock />);
      expect(container).toBeEmpty();
    });
  });
});

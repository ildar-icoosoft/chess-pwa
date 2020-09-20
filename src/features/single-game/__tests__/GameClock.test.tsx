import { render } from "@testing-library/react";
import React from "react";
import { GameClock } from "../GameClock";
import { gameSample } from "../../../test-utils/data-sample/game";

describe("GameClock", () => {
  describe("DOM structure", () => {
    it("should display time", () => {
      const { rerender, getByTestId } = render(<GameClock game={gameSample} />);

      expect(getByTestId("time").innerHTML).toBe("05 : 10");

      rerender(<GameClock game={gameSample} color={"black"} />);
      expect(getByTestId("time").innerHTML).toBe("06 : 05");
    });

    it("should contain nothing if no game", () => {
      const { container } = render(<GameClock />);
      expect(container).toBeEmpty();
    });
  });
});

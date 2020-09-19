import React from "react";
import { render } from "@testing-library/react";
import { GameMeta } from "../GameMeta";
import {
  blackOutOfTimeGameSample,
  gameSample,
  gameSample2,
  gameSample3,
  whiteOutOfTimeGameSample,
} from "../../../test-utils/data-sample/game";

describe("GameMeta", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameMeta />);
      expect(container).toBeEmpty();
    });

    it("should contain status", () => {
      const { queryByText, rerender } = render(<GameMeta game={gameSample} />);

      expect(queryByText("Playing right now")).not.toBeNull();

      rerender(<GameMeta game={whiteOutOfTimeGameSample} />);
      expect(queryByText("Time out • Black is victorious")).not.toBeNull();

      rerender(<GameMeta game={blackOutOfTimeGameSample} />);
      expect(queryByText("Time out • White is victorious")).not.toBeNull();
    });

    it("should contain players names", () => {
      const { getByTestId, rerender } = render(<GameMeta game={gameSample2} />);

      expect(getByTestId("white-user").innerHTML).toContain("AI level 3");
      expect(getByTestId("black-user").innerHTML).toContain("Thomas Miller");

      rerender(<GameMeta game={gameSample3} />);

      expect(getByTestId("white-user").innerHTML).toContain("Thomas Miller");
      expect(getByTestId("black-user").innerHTML).toContain("AI level 3");
    });
  });
});

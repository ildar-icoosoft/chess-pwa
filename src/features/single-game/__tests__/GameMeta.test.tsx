import React from "react";
import { render } from "@testing-library/react";
import { GameMeta } from "../GameMeta";
import {
  blackOutOfTimeGameSample,
  gameSample,
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
  });
});

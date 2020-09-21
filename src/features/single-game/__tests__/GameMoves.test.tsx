import { render } from "@testing-library/react";
import React from "react";
import { GameMoves } from "../GameMoves";
import { gameWithMovesSample } from "../../../test-utils/data-sample/game";

describe("GameMoves", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameMoves />);
      expect(container).toBeEmpty();
    });

    it("should contain moves", () => {
      const { getByTestId } = render(<GameMoves game={gameWithMovesSample} />);

      expect(getByTestId("move-e2e4")).toContainHTML("e2e4");
      expect(getByTestId("move-e7e5")).toContainHTML("e7e5");
    });
  });
});

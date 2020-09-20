import { render } from "@testing-library/react";
import React from "react";
import { GameControlPanel } from "../GameControlPanel";
import { gameSample } from "../../../test-utils/data-sample/game";
import TestRenderer from "react-test-renderer";
import { GameClock } from "../GameClock";
import { GameMoves } from "../GameMoves";

describe("GameControlPanel", () => {
  describe("children components", () => {
    it("contains GameClock", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameClock).length).toBe(2);
    });

    it("contains GameMoves", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameMoves).length).toBe(1);
    });
  });

  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanel />);
      expect(container).toBeEmpty();
    });
  });
});

import { render } from "@testing-library/react";
import React from "react";
import { GameControlPanel } from "../GameControlPanel";
import {
  gameSample,
  gameSampleFen,
  gameWithMovesSample,
  gameWithMovesSampleFen,
} from "../../../test-utils/data-sample/game";
import TestRenderer from "react-test-renderer";
import { GameClock } from "../GameClock";
import { GameMoves } from "../GameMoves";
import { GameControlPanelUserName } from "../GameControlPanelUserName";
import { GameControlPanelBottomToolbar } from "../GameControlPanelBottomToolbar";
import { GameControlPanelTopToolbar } from "../GameControlPanelTopToolbar";
import { SingleGame } from "../SingleGame";
import { Board } from "ii-react-chessboard";

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

    it("contains GameControlPanelUserName", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanelUserName).length).toBe(
        2
      );
    });

    it("contains GameControlPanelTopToolbar", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(
        testInstance.findAllByType(GameControlPanelTopToolbar).length
      ).toBe(1);
    });

    it("contains GameControlPanelBottomToolbar", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(
        testInstance.findAllByType(GameControlPanelBottomToolbar).length
      ).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GameClock", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameClocks = testInstance.findAllByType(GameClock);

        expect(gameClocks[0].props.game).toBe(gameSample);
        expect(gameClocks[1].props.game).toBe(gameSample);
      });

      it("turnColor", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameClocks = testInstance.findAllByType(GameClock);

        expect(gameClocks[0].props.turnColor).toBe("white");
        expect(gameClocks[1].props.turnColor).toBe("white");

        testRenderer.update(
          <GameControlPanel game={gameSample} turnColor={"black"} />
        );

        expect(gameClocks[0].props.turnColor).toBe("black");
        expect(gameClocks[1].props.turnColor).toBe("black");
      });

      it("color", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameClocks = testInstance.findAllByType(GameClock);

        expect(gameClocks[0].props.color).toBe("black");
        expect(gameClocks[1].props.color).toBe("white");

        testRenderer.update(
          <GameControlPanel game={gameSample} orientation={"black"} />
        );

        expect(gameClocks[0].props.color).toBe("white");
        expect(gameClocks[1].props.color).toBe("black");
      });
    });
  });

  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanel />);
      expect(container).toBeEmpty();
    });
  });
});

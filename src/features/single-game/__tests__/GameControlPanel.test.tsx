import { render } from "@testing-library/react";
import React from "react";
import { GameControlPanel } from "../GameControlPanel";
import { gameSample } from "../../../test-utils/data-sample/game";
import TestRenderer from "react-test-renderer";
import { GameClock } from "../GameClock";
import { GameMoves } from "../GameMoves";
import { GameControlPanelUserName } from "../GameControlPanelUserName";
import { GameControlPanelBottomToolbar } from "../GameControlPanelBottomToolbar";
import { GameControlPanelTopToolbar } from "../GameControlPanelTopToolbar";

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
      it("time", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameClocks = testInstance.findAllByType(GameClock);

        expect(gameClocks[0].props.time).toBe(365000);
        expect(gameClocks[1].props.time).toBe(310000);

        testRenderer.update(
          <GameControlPanel game={gameSample} orientation={"black"} />
        );

        expect(gameClocks[0].props.time).toBe(310000);
        expect(gameClocks[1].props.time).toBe(365000);
      });
    });

    describe("GameControlPanelUserName", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanelUserNames = testInstance.findAllByType(
          GameControlPanelUserName
        );

        expect(gameControlPanelUserNames[0].props.game).toBe(gameSample);
        expect(gameControlPanelUserNames[1].props.game).toBe(gameSample);
      });

      it("color", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanelUserNames = testInstance.findAllByType(
          GameControlPanelUserName
        );

        expect(gameControlPanelUserNames[0].props.color).toBe("black");
        expect(gameControlPanelUserNames[1].props.color).toBe("white");

        testRenderer.update(
          <GameControlPanel game={gameSample} orientation={"black"} />
        );

        expect(gameControlPanelUserNames[0].props.color).toBe("white");
        expect(gameControlPanelUserNames[1].props.color).toBe("black");
      });
    });

    describe("GameMoves", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMoves = testInstance.findByType(GameMoves);

        expect(gameMoves.props.game).toBe(gameSample);
      });

      it("onRewindToMove", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMoves = testInstance.findByType(GameMoves);

        expect(gameMoves.props.onRewindToMove).toBeUndefined();

        const onRewindToMove = jest.fn();

        testRenderer.update(
          <GameControlPanel game={gameSample} onRewindToMove={onRewindToMove} />
        );

        expect(gameMoves.props.onRewindToMove).toBe(onRewindToMove);
      });
    });
  });

  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanel />);
      expect(container).toBeEmptyDOMElement();
    });
  });
});

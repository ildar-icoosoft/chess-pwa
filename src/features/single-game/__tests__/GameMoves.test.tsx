import { fireEvent, render } from "@testing-library/react";
import React from "react";
import TestRenderer from "react-test-renderer";
import { GameMoves } from "../GameMoves";
import { makeGameSample } from "../../../test-utils/data-sample/game";
import { GameControlPanelStatus } from "../GameControlPanelStatus";

const gameWithMovesSample = makeGameSample({
  moves: "e2e4 e7e5 g1f3 g8f6",
});

describe("GameMoves", () => {
  describe("children components", () => {
    it("contains GameControlPanelStatus", () => {
      const testRenderer = TestRenderer.create(<GameMoves />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanelStatus).length).toBe(0);

      const startedGameSample = makeGameSample({
        status: "started",
      });

      testRenderer.update(<GameMoves game={startedGameSample} />);

      expect(testInstance.findAllByType(GameControlPanelStatus).length).toBe(0);

      const finishedGameSample = makeGameSample({
        status: "mate",
        winner: "white",
      });

      testRenderer.update(<GameMoves game={finishedGameSample} />);

      expect(testInstance.findAllByType(GameControlPanelStatus).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GameControlPanelStatus", () => {
      it("game", () => {
        const finishedGameSample = makeGameSample({
          status: "mate",
          winner: "white",
        });

        const testRenderer = TestRenderer.create(
          <GameMoves game={finishedGameSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanelStatus = testInstance.findByType(
          GameControlPanelStatus
        );

        expect(gameControlPanelStatus.props.game).toBe(finishedGameSample);
      });
    });
  });

  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameMoves />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain moves", () => {
      const { getByTestId } = render(<GameMoves game={gameWithMovesSample} />);

      expect(getByTestId("move-1")).toContainHTML("e2e4");
      expect(getByTestId("move-2")).toContainHTML("e7e5");
    });

    it("should contain selected class", () => {
      const { getByTestId, rerender } = render(
        <GameMoves game={gameWithMovesSample} />
      );

      expect(getByTestId("move-1")).not.toHaveClass("selected");
      expect(getByTestId("move-2")).not.toHaveClass("selected");
      expect(getByTestId("move-3")).not.toHaveClass("selected");
      expect(getByTestId("move-4")).toHaveClass("selected");

      rerender(<GameMoves game={gameWithMovesSample} rewindToMoveIndex={1} />);

      expect(getByTestId("move-1")).toHaveClass("selected");
      expect(getByTestId("move-2")).not.toHaveClass("selected");
      expect(getByTestId("move-3")).not.toHaveClass("selected");
      expect(getByTestId("move-4")).not.toHaveClass("selected");

      rerender(<GameMoves game={gameWithMovesSample} rewindToMoveIndex={0} />);

      expect(getByTestId("move-1")).not.toHaveClass("selected");
      expect(getByTestId("move-2")).not.toHaveClass("selected");
      expect(getByTestId("move-3")).not.toHaveClass("selected");
      expect(getByTestId("move-4")).not.toHaveClass("selected");
    });
  });

  describe("Events", () => {
    it("onRewindToMove", () => {
      const onRewindToMove = jest.fn();

      const { getByTestId } = render(
        <GameMoves game={gameWithMovesSample} onRewindToMove={onRewindToMove} />
      );

      fireEvent.click(getByTestId("move-1"));

      expect(onRewindToMove).toBeCalledTimes(1);
      expect(onRewindToMove).toBeCalledWith(1);
    });
  });
});

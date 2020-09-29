import mountTest from "../../../test-utils/mountTest";
import { GamePreviewsListItem } from "../GamePreviewsListItem";
import TestRenderer from "react-test-renderer";
import { Board } from "ii-react-chessboard";
import { Link } from "react-router-dom";
import React from "react";
import {
  defaultGameSample,
  gameSampleFen,
  gameWithMovesSample,
  gameWithMovesSampleFen,
  makeGameSample,
} from "../../../test-utils/data-sample/game";
import { render } from "@testing-library/react";
import { GamePreviewUserName } from "../GamePreviewUserName";
import { GamePreviewResult } from "../GamePreviewResult";
import { GamePreviewClock } from "../GamePreviewClock";

describe("GamePreviewsListItem", () => {
  mountTest(GamePreviewsListItem);

  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GamePreviewsListItem />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={defaultGameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });

    it("contains Link", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={defaultGameSample} />
      );
      const testInstance = testRenderer.root;

      const links = testInstance.findAllByType(Link);

      expect(links.length).toBe(1);
    });

    it("contains GamePreviewUserName", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={defaultGameSample} />
      );
      const testInstance = testRenderer.root;

      const gamePreviewUserNames = testInstance.findAllByType(
        GamePreviewUserName
      );

      expect(gamePreviewUserNames.length).toBe(2);
    });

    it("contains GamePreviewResult", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={defaultGameSample} />
      );
      const testInstance = testRenderer.root;

      let gamePreviewResults = testInstance.findAllByType(GamePreviewResult);

      expect(gamePreviewResults.length).toBe(0);

      const gameSampleWithResult = makeGameSample({
        winner: "black",
        status: "mate",
      });

      testRenderer.update(<GamePreviewsListItem game={gameSampleWithResult} />);

      gamePreviewResults = testInstance.findAllByType(GamePreviewResult);

      expect(gamePreviewResults.length).toBe(2);
    });

    it("contains GamePreviewClock", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={defaultGameSample} />
      );
      const testInstance = testRenderer.root;

      let gamePreviewClocks = testInstance.findAllByType(GamePreviewClock);

      expect(gamePreviewClocks.length).toBe(2);

      const gameSampleWithResult = makeGameSample({
        winner: "black",
        status: "mate",
      });

      testRenderer.update(<GamePreviewsListItem game={gameSampleWithResult} />);

      gamePreviewClocks = testInstance.findAllByType(GamePreviewClock);

      expect(gamePreviewClocks.length).toBe(0);
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(gameSampleFen);

        testRenderer.update(
          <GamePreviewsListItem game={gameWithMovesSample} />
        );
        expect(board.props.position).toBe(gameWithMovesSampleFen);
      });

      it("viewOnly", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.viewOnly).toBeFalsy();
      });
    });

    describe("Link", () => {
      it("to", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const link = testInstance.findByType(Link);

        expect(link.props.to).toBe("/game/1");
      });
    });

    describe("GamePreviewUserName", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewUserName
        );

        expect(GamePreviewUserNames[0].props.game).toBe(defaultGameSample);
        expect(GamePreviewUserNames[1].props.game).toBe(defaultGameSample);
      });

      it("color", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewUserName
        );

        expect(GamePreviewUserNames[0].props.color).toBe("black");
        expect(GamePreviewUserNames[1].props.color).toBe("white");
      });
    });

    describe("GamePreviewResult", () => {
      it("game", () => {
        const gameSampleWithResult = makeGameSample({
          winner: "black",
          status: "mate",
        });

        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSampleWithResult} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewResult
        );

        expect(GamePreviewUserNames[0].props.game).toBe(gameSampleWithResult);
        expect(GamePreviewUserNames[1].props.game).toBe(gameSampleWithResult);
      });

      it("color", () => {
        const gameSampleWithResult = makeGameSample({
          winner: "black",
          status: "mate",
        });

        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSampleWithResult} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewResult
        );

        expect(GamePreviewUserNames[0].props.color).toBe("black");
        expect(GamePreviewUserNames[1].props.color).toBe("white");
      });
    });
  });
});

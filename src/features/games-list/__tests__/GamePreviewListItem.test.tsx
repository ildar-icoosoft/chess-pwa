import mountTest from "../../../test-utils/mountTest";
import { GamePreviewsListItem } from "../GamePreviewsListItem";
import TestRenderer from "react-test-renderer";
import { Board } from "ii-react-chessboard";
import { Link } from "react-router-dom";
import React from "react";
import {
  gameSample,
  gameSampleFen,
  gameWithMovesSample,
  gameWithMovesSampleFen,
} from "../../../test-utils/data-sample/game";
import { render } from "@testing-library/react";
import { GamePreviewsList } from "../GamePreviewsList";

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
        <GamePreviewsListItem game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });

    it("contains Link", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={gameSample} />
      );
      const testInstance = testRenderer.root;

      const links = testInstance.findAllByType(Link);

      expect(links.length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample} />
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
          <GamePreviewsListItem game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.viewOnly).toBeFalsy();
      });
    });

    describe("Link", () => {
      it("to", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const link = testInstance.findByType(Link);

        expect(link.props.to).toBe("/game/1");
      });
    });
  });
});

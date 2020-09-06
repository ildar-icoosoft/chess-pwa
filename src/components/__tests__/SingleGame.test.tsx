import TestRenderer from "react-test-renderer";
import React from "react";
import { Board, PieceColor } from "ii-react-chessboard";
import { SingleGame } from "../SingleGame";
import Game from "../../interfaces/Game";

const gameSample: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
};

describe("SingleGame", () => {
  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<SingleGame />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

      testRenderer.update(<SingleGame game={gameSample} />);

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame
            game={{
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "e2e4 e7e5 g1g3", // g1g3 is incorrect move and must be ignored
              status: "started",
              white: null,
              black: null,
            }}
          />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2"
        );

        testRenderer.update(
          <SingleGame
            game={{
              id: 2,
              initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
              wtime: 300000,
              btime: 300000,
              moves: "",
              status: "started",
              white: null,
              black: null,
            }}
          />
        );

        expect(board.props.position).toBe(
          "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1"
        );
      });

      it("clickable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.clickable).toBeTruthy();
      });

      it("draggable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.draggable).toBeTruthy();
      });

      it("turnColor", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame
            game={{
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "e2e4 e7e5 g8f6 g1f3", // g8f6 is invalid move and must be ignored
              status: "started",
              white: null,
              black: null,
            }}
          />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.turnColor).toBe(PieceColor.BLACK);

        testRenderer.update(
          <SingleGame
            game={{
              id: 2,
              initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR b KQkq - 0 1",
              wtime: 300000,
              btime: 300000,
              moves: "e8e7",
              status: "started",
              white: null,
              black: null,
            }}
          />
        );

        expect(board.props.turnColor).toBe(PieceColor.WHITE);
      });
    });
  });

  describe("Events", () => {
    it("onMove", () => {
      const onMove = jest.fn();

      const testInstance = TestRenderer.create(
        <SingleGame game={gameSample} onMove={onMove} />
      ).root;

      const board: TestRenderer.ReactTestInstance = testInstance.findByType(
        Board
      );

      TestRenderer.act(() => {
        board.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(onMove).toBeCalledTimes(1);

      expect(onMove).toBeCalledWith({
        from: "e2",
        to: "e4",
      });
    });
  });
});

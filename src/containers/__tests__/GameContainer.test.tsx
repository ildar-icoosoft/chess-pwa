/* eslint-disable @typescript-eslint/ban-ts-comment */

import TestRenderer from "react-test-renderer";
import React from "react";
import { Board } from "ii-react-chessboard";
import { GameContainer } from "../GameContainer";
import * as api from "../../services/api";

jest.useFakeTimers();

jest.mock("../../services/api");

describe("GameContainer", () => {
  // @todo. need to fix GameContainer to work with components with async useEffect()
  // mountTest(GameContainer);

  describe("children components", () => {
    describe("contains Board", () => {
      it("if game exists", async () => {
        // @ts-ignore
        api.setMockGame({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        });
        // @ts-ignore
        api.setGetGameDelay(1000);

        const testRenderer = TestRenderer.create(<GameContainer id={1} />);
        const testInstance = testRenderer.root;

        expect(testInstance.findAllByType(Board).length).toBe(0);

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect(testInstance.findAllByType(Board).length).toBe(1);
      });

      it("if game not exists", async () => {
        // @ts-ignore
        api.setMockGame("game not exists", 404);
        // @ts-ignore
        api.setGetGameDelay(1000);

        const testRenderer = TestRenderer.create(<GameContainer id={1} />);
        const testInstance = testRenderer.root;

        expect(testInstance.findAllByType(Board).length).toBe(0);

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect(testInstance.findAllByType(Board).length).toBe(0);
      });
    });
  });

  describe("children components props", () => {
    describe("Game", () => {
      it("game", async () => {
        // @ts-ignore
        api.setMockGame({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "e2e4 e7e5 g1g3", // g1g3 is incorrect move and must be ignored
          status: "started",
          white: null,
          black: null,
        });
        // @ts-ignore
        api.setGetGameDelay(1000);

        const testRenderer = TestRenderer.create(<GameContainer id={1} />);
        const testInstance = testRenderer.root;

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2"
        );

        // @ts-ignore
        api.setMockGame({
          id: 2,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        });

        testRenderer.update(<GameContainer id={2} />);

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect(board.props.position).toBe(
          "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1"
        );
      });
    });
  });
});

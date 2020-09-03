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
});

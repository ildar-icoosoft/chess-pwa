import { useDispatch, useSelector } from "react-redux";
import { stateWithDataSample } from "../../../test-utils/data-sample/state";
import React, { useEffect } from "react";
import mountTest from "../../../test-utils/mountTest";
import { SingleGameBoardContainer } from "../SingleGameBoardContainer";
import TestRenderer from "react-test-renderer";
import { SingleGameBoard } from "../SingleGameBoard";

describe("SingleGameBoardContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SingleGameBoardContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGameBoard", async () => {
      const testRenderer = TestRenderer.create(
        <SingleGameBoardContainer id={2} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGameBoard).length).toBe(0);

      testRenderer.update(<SingleGameBoardContainer id={1} />);

      expect(testInstance.findAllByType(SingleGameBoard).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGameBoard", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.game).toEqual({
          id: 1,
          aiLevel: 3,
          clockLimit: 300,
          clockIncrement: 3,
          createdAt: 0,
          drawOffer: null,
          initialFen: "startpos",
          turn: "white",
          wtime: 300000,
          btime: 300000,
          moves: "e2e4 e7e5 g1f3 g8f6",
          status: "started",
          white: null,
          black: null,
          winner: null,
        });
      });
    });
  });
});

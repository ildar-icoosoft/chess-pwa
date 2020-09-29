import { useDispatch, useSelector } from "react-redux";
import {
  stateWithDataSample,
  stateWithDataSample2,
  stateWithDataSample3,
} from "../../../test-utils/data-sample/state";
import React, { useEffect } from "react";
import mountTest from "../../../test-utils/mountTest";
import { SingleGameBoardContainer } from "../SingleGameBoardContainer";
import TestRenderer from "react-test-renderer";
import { SingleGameBoard } from "../SingleGameBoard";
import { makeMove } from "../../move/moveSlice";

jest.mock("../../move/moveSlice");

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

      it("currentUser", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.currentUser).toEqual({
          id: 1,
          fullName: "Thomas Miller",
        });

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);

        expect(singleGameBoard.props.currentUser).toBeUndefined();
      });

      it("isFlipped", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);
        expect(singleGameBoard.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);
        expect(singleGameBoard.props.isFlipped).toBeTruthy();
      });

      it("rewindToMoveIndex", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.rewindToMoveIndex).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);
        expect(singleGameBoard.props.rewindToMoveIndex).toBe(2);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);
        expect(singleGameBoard.props.rewindToMoveIndex).toBe(0);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(makeMove())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const makeMoveReturnedValue = Symbol("makeMove");

      const testRenderer = TestRenderer.create(
        <SingleGameBoardContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameBoard = testInstance.findByType(SingleGameBoard);

      const makeMoveFn = makeMove as jest.Mock;
      makeMoveFn.mockClear();
      makeMoveFn.mockReturnValue(makeMoveReturnedValue);

      TestRenderer.act(() => {
        singleGameBoard.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(makeMoveFn).toBeCalledTimes(1);
      expect(makeMoveFn).toBeCalledWith(1, "e2e4");

      expect(dispatch).toBeCalledWith(makeMoveReturnedValue);
    });
  });
});

/*
currentUser,
  game,
  isFlipped = false,
  onMove,
  rewindToMoveIndex = null,*/

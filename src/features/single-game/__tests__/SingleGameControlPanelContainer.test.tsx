import { useDispatch, useSelector } from "react-redux";
import {
  stateWithDataSample,
  stateWithDataSample2,
  stateWithDataSample3,
} from "../../../test-utils/data-sample/state";
import React, { useEffect } from "react";
import mountTest from "../../../test-utils/mountTest";
import { SingleGameControlPanelContainer } from "../SingleGameControlPanelContainer";
import TestRenderer from "react-test-renderer";
import { GameControlPanel } from "../GameControlPanel";
import { SingleGameControlPanelWrapper } from "../SingleGameControlPanelWrapper";
import { SingleGameContainer } from "../SingleGameContainer";
import { SingleGame } from "../SingleGame";

describe("SingleGameControlPanelContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SingleGameControlPanelContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGameControlPanelWrapper", async () => {
      const testRenderer = TestRenderer.create(
        <SingleGameControlPanelContainer id={2} />
      );
      const testInstance = testRenderer.root;

      expect(
        testInstance.findAllByType(SingleGameControlPanelWrapper).length
      ).toBe(0);

      testRenderer.update(<SingleGameControlPanelContainer id={1} />);

      expect(
        testInstance.findAllByType(SingleGameControlPanelWrapper).length
      ).toBe(1);
    });
  });

  describe("children components", () => {
    describe("SingleGameControlPanelWrapper", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          SingleGameControlPanelWrapper
        );

        expect(singleGameControlPanelWrapper.props.game).toEqual({
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
          <SingleGameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          SingleGameControlPanelWrapper
        );

        expect(singleGameControlPanelWrapper.props.currentUser).toEqual({
          id: 1,
          fullName: "Thomas Miller",
        });

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameControlPanelContainer id={1} />);

        expect(singleGameControlPanelWrapper.props.currentUser).toBeUndefined();
      });

      it("isFlipped", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          SingleGameControlPanelWrapper
        );

        expect(singleGameControlPanelWrapper.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<SingleGameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.isFlipped).toBeTruthy();
      });

      it("rewindToMoveIndex", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          SingleGameControlPanelWrapper
        );

        expect(
          singleGameControlPanelWrapper.props.rewindToMoveIndex
        ).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.rewindToMoveIndex).toBe(2);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<SingleGameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.rewindToMoveIndex).toBe(0);
      });
    });
  });
});

/*

game,
  currentUser,
  isFlipped = false,
  rewindToMoveIndex = null,
  onFlipBoard,
  onAcceptDrawOffer,
  onDeclineDrawOffer,
  onAbortGame,
  onOfferDraw,
  onResignGame,*/

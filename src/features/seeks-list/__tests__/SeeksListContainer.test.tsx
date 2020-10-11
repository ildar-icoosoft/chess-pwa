import { useDispatch, useSelector } from "react-redux";
import {
  defaultState,
  stateWithDataSample4,
} from "../../../test-utils/data-sample/state";
import React, { useEffect } from "react";
import mountTest from "../../../test-utils/mountTest";
import SeeksListContainer from "../SeeksListContainer";
import TestRenderer from "react-test-renderer";
import { SeeksList } from "../SeeksList";
import OngoingGamesContainer from "../../games-list/OngoingGamesContainer";
import { GamePreviewsList } from "../../games-list/GamePreviewsList";

describe("SeeksListContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SeeksListContainer);

  describe("children components", () => {
    it("contains SeeksList", async () => {
      const testRenderer = TestRenderer.create(<SeeksListContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeeksList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SeeksList", () => {
      it("seeks", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.seeks).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample4)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(seeksListComponent.props.games).toEqual([
          {
            id: 4,
            aiLevel: 3,
            clockLimit: 300,
            clockIncrement: 3,
            createdAt: 1,
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
          },
          {
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
          },
        ]);
      });
    });
  });
});

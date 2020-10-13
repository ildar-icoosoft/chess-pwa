import { useDispatch, useSelector } from "react-redux";
import {
  defaultState,
  makeStateSample,
  stateWithDataSample5,
} from "../../../test-utils/data-sample/state";
import React, { useEffect } from "react";
import mountTest from "../../../test-utils/mountTest";
import SeeksListContainer from "../SeeksListContainer";
import TestRenderer from "react-test-renderer";
import { SeeksList } from "../SeeksList";
import { acceptSeek } from "../../challenge/challengeSlice";
import { defaultGameSample } from "../../../test-utils/data-sample/game";
import { useHistory } from "react-router-dom";

jest.mock("../../challenge/challengeSlice");

const stateWithCurrentUser = makeStateSample({
  currentUser: {
    userId: 8,
    isLoading: false,
    error: null,
  },
});

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
          cb(stateWithDataSample5)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.seeks).toEqual([
          {
            id: 2,
            color: "black",
            clockLimit: 600,
            createdAt: 0,
            clockIncrement: 10,
            createdBy: {
              id: 1,
              fullName: "Thomas Miller",
            },
            game: {
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
          },
          {
            id: 1,
            color: "white",
            clockLimit: 300,
            createdAt: 0,
            clockIncrement: 5,
            createdBy: {
              id: 1,
              fullName: "Thomas Miller",
            },
            game: null,
          },
        ]);
      });

      it("acceptInProcess", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.acceptInProcess).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample5)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.acceptInProcess).toBe(6);
      });

      it("currentUserId", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.currentUserId).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithCurrentUser)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.currentUserId).toBe(8);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(acceptSeek())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<SeeksListContainer />);
      const testInstance = testRenderer.root;

      const seeksList = testInstance.findByType(SeeksList);

      const acceptSeekReturnedValue = Symbol("acceptSeek");

      const acceptSeekFn = acceptSeek as jest.Mock;
      acceptSeekFn.mockClear();
      acceptSeekFn.mockReturnValue(acceptSeekReturnedValue);

      TestRenderer.act(() => {
        seeksList.props.onPlay(5);
      });

      expect(acceptSeekFn).toBeCalledTimes(1);
      expect(acceptSeekFn).toBeCalledWith(5);

      expect(dispatch).toBeCalledWith(acceptSeekReturnedValue);
    });

    it("should handle dispatch(acceptSeek()) success", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => Promise.resolve(defaultGameSample));

      const testRenderer = TestRenderer.create(<SeeksListContainer />);
      const testInstance = testRenderer.root;

      const seeksList = testInstance.findByType(SeeksList);

      await TestRenderer.act(async () => {
        seeksList.props.onPlay(5);
      });

      const push = useHistory().push as jest.Mock;

      expect(push).toBeCalledTimes(1);
      expect(push).toBeCalledWith("/game/1");
    });

    // @todo. need to test dispatch(acceptSeek()) fail
  });
});

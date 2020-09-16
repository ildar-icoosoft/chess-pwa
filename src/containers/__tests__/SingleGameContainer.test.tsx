import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SingleGameContainer } from "../SingleGameContainer";
import { SingleGame } from "../../components/SingleGame";
import mountTest from "../../test-utils/mountTest";
import { RootState } from "../../app/rootReducer";
import { makeMove } from "../../redux/slices/moveSlice";
import { fetchGame } from "../../redux/slices/singleGameSlice";

jest.useFakeTimers();

jest.mock("../../redux/slices/moveSlice");
jest.mock("../../redux/slices/singleGameSlice");

const stateSample: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
  },
  ongoingGames: {
    items: [],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {},
    games: {
      "1": {
        id: 1,
        initialFen: "startpos",
        wtime: 300000,
        btime: 300000,
        moves: "",
        status: "started",
        white: null,
        black: null,
      },
    },
  },
};

describe("SingleGameContainer", () => {
  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(stateSample));
  });

  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SingleGameContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGame", async () => {
      const testRenderer = TestRenderer.create(<SingleGameContainer id={2} />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGame).length).toBe(0);

      testRenderer.update(<SingleGameContainer id={1} />);

      expect(testInstance.findAllByType(SingleGame).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGame", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.game).toEqual({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        });
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(makeMove())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const makeMoveReturnedValue = Symbol();

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const makeMoveFn = makeMove as jest.Mock;
      makeMoveFn.mockReturnValue(makeMoveReturnedValue);

      makeMoveFn.mockClear();

      TestRenderer.act(() => {
        singleGame.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(makeMoveFn).toBeCalledTimes(1);
      expect(makeMoveFn).toBeCalledWith(1, "e2e4");

      expect(dispatch).toBeCalledWith(makeMoveReturnedValue);
    });

    it("fetchGame()", () => {
      const dispatch = useDispatch<jest.Mock>();
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchGameReturnedValue = Symbol();

      const fetchGameFn = fetchGame as jest.Mock;
      fetchGameFn.mockClear();
      fetchGameFn.mockReturnValue(fetchGameReturnedValue);

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);

      fetchGameFn.mockClear();
      dispatch.mockClear();
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      TestRenderer.act(() => {
        testRenderer.update(<SingleGameContainer id={2} />);
      });

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(2);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);
    });
  });
});

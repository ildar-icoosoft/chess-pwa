import TestRenderer from "react-test-renderer";
import React from "react";
import { OngoingGamesContainer } from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";
import Game from "../../interfaces/Game";

jest.useFakeTimers();

jest.mock("../../services/api");

const gamesBeforeChange: Game[] = [
  {
    id: 1,
    initialFen: "startpos",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 2,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 3,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
];

const gamesAfterChange: Game[] = [
  {
    id: 1,
    initialFen: "startpos",
    wtime: 300000,
    btime: 300000,
    moves: "e2e4",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 2,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 3,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
];

describe("OngoingGamesContainer", () => {
  // @todo. need to fix mountTest to work with components with async useEffect()
  // mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", async () => {
      const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      it("games", async () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.games).toEqual([]);

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect(gamePreviewsComponent.props.games).toEqual(gamesBeforeChange);

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect(gamePreviewsComponent.props.games).toEqual(gamesAfterChange);
      });
    });
  });
});

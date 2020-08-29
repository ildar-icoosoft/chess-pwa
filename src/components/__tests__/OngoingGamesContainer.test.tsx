import TestRenderer from "react-test-renderer";
import React from "react";
import mountTest from "../../tests/mountTest";
import { OngoingGamesContainer } from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";
import Game from "../../interfaces/Game";

jest.useFakeTimers();

const games: Game[] = [
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
];

describe("OngoingGamesContainer", () => {
  mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", () => {
      const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      it("games", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.games).toEqual([]);

        TestRenderer.act(() => {
          jest.runAllTimers();
        });

        expect(gamePreviewsComponent.props.games).toEqual(games);
      });
    });
  });
});

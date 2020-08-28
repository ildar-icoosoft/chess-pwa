import React from "react";
import TestRenderer from "react-test-renderer";
import { Board } from "ii-react-chessboard";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../tests/mountTest";
import Game from "../../interfaces/Game";

describe("OngoingGames", () => {
  mountTest(GamePreviewsList);

  it("Snapshot", () => {
    const tree = TestRenderer.create(<GamePreviewsList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<GamePreviewsList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

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
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ];

      testRenderer.update(<GamePreviewsList games={games} />);
      expect(testInstance.findAllByType(Board).length).toBe(2);
    });
  });
});

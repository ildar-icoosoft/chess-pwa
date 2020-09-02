import TestRenderer from "react-test-renderer";
import React from "react";
import { Board } from "ii-react-chessboard";
import { GameContainer } from "../GameContainer";

jest.useFakeTimers();

jest.mock("../../services/api");

describe("GameContainer", () => {
  // @todo. need to fix GameContainer to work with components with async useEffect()
  // mountTest(GameContainer);

  describe("children components", () => {
    it("contains Board", async () => {
      const testRenderer = TestRenderer.create(<GameContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });
  });
});

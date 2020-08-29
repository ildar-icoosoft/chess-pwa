import TestRenderer from "react-test-renderer";
import React from "react";
import mountTest from "../../tests/mountTest";
import { OngoingGamesContainer } from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";

describe("OngoingGamesContainer", () => {
  mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", () => {
      const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });
});

import mountTest from "../../../test-utils/mountTest";
import ChallengeButtonsContainer from "../ChallengeButtonsContainer";
import TestRenderer from "react-test-renderer";
import React from "react";
import { ChallengeButtons } from "../ChallengeButtons";

describe("ChallengeButtonsContainer", () => {
  mountTest(ChallengeButtonsContainer);

  describe("children components", () => {
    it("ChallengeButtons", () => {
      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeButtons).length).toBe(1);
    });
  });
});

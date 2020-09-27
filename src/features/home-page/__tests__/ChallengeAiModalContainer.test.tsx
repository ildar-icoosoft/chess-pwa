import mountTest from "../../../test-utils/mountTest";
import { ChallengeAiModalContainer } from "../ChallengeAiModalContainer";
import TestRenderer from "react-test-renderer";
import React from "react";
import { ChallengeAiModal } from "../ChallengeAiModal";

describe("ChallengeAiModalContainer", () => {
  mountTest(ChallengeAiModalContainer);

  describe("children components", () => {
    it("contains ChallengeAiModal", () => {
      const testRenderer = TestRenderer.create(<ChallengeAiModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeAiModal).length).toBe(1);
    });
  });
});

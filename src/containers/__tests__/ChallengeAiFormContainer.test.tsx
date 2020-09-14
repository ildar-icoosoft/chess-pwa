import React from "react";
import TestRenderer from "react-test-renderer";
import mountTest from "../../tests/mountTest";
import { ChallengeAiFormContainer } from "../ChallengeAiFormContainer";
import { ChallengeAiForm } from "../../components/ChallengeAiForm";

jest.useFakeTimers();

describe("ChallengeAiFormContainer", () => {
  mountTest(ChallengeAiFormContainer);

  describe("children components", () => {
    it("contains LoginForm", async () => {
      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeAiForm).length).toBe(1);
    });
  });
});

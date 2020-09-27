import mountTest from "../../../test-utils/mountTest";
import { ChallengeAiModalContainer } from "../ChallengeAiModalContainer";
import TestRenderer from "react-test-renderer";
import React from "react";
import { ChallengeAiModal } from "../ChallengeAiModal";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultState,
  makeStateSample,
  stateWithDataSample,
} from "../../../test-utils/data-sample/state";

describe("ChallengeAiModalContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
  });

  mountTest(ChallengeAiModalContainer);

  describe("children components", () => {
    it("contains ChallengeAiModal", () => {
      const testRenderer = TestRenderer.create(<ChallengeAiModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeAiModal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ChallengeAiModal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<ChallengeAiModalContainer />);
        const testInstance = testRenderer.root;

        const challengeAiModal = testInstance.findByType(ChallengeAiModal);

        expect(challengeAiModal.props.show).toBeFalsy();

        const stateWithChallengeAiModal = makeStateSample(
          {
            challengeAiModal: {
              isChallengeAiModalVisible: true,
            },
          },
          defaultState
        );

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithChallengeAiModal)
        );

        testRenderer.update(<ChallengeAiModalContainer />);

        expect(challengeAiModal.props.show).toBeTruthy();
      });
    });
  });
});

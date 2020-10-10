import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import { defaultState } from "../../../test-utils/data-sample/state";
import SeekModalContainer from "../SeekModalContainer";
import { SeekModal } from "../SeekModal";

jest.mock("../../seek-modal/seekModalSlice");

describe("SeekModalContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
  });

  mountTest(SeekModalContainer);

  describe("children components", () => {
    it("contains ChallengeAiModal", () => {
      const testRenderer = TestRenderer.create(<SeekModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeekModal).length).toBe(1);
    });
  });

  /*describe("children components props", () => {
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

  describe("dispatch() calls", () => {
    it("should call dispatch(hideChallengeAiModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const hideChallengeAiModalReturnedValue = Symbol("hideChallengeAiModal");

      const testRenderer = TestRenderer.create(<ChallengeAiModalContainer />);
      const testInstance = testRenderer.root;

      const challengeAiModal = testInstance.findByType(ChallengeAiModal);

      const hideChallengeAiModalFn = (hideChallengeAiModal as unknown) as jest.Mock;
      hideChallengeAiModalFn.mockClear();
      hideChallengeAiModalFn.mockReturnValue(hideChallengeAiModalReturnedValue);

      TestRenderer.act(() => {
        challengeAiModal.props.onHide();
      });

      expect(hideChallengeAiModalFn).toBeCalledTimes(1);
      expect(hideChallengeAiModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(hideChallengeAiModalReturnedValue);
    });
  });*/
});

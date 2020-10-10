import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
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
    it("contains SeekModal", () => {
      const testRenderer = TestRenderer.create(<SeekModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeekModal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SeekModal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<SeekModalContainer />);
        const testInstance = testRenderer.root;

        const seekModal = testInstance.findByType(SeekModal);

        expect(seekModal.props.show).toBeFalsy();

        const stateWithSeekModal = makeStateSample(
          {
            seekModal: {
              isSeekModalVisible: true,
            },
          },
          defaultState
        );

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithSeekModal)
        );

        testRenderer.update(<SeekModalContainer />);

        expect(seekModal.props.show).toBeTruthy();
      });
    });
  });

  /*

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

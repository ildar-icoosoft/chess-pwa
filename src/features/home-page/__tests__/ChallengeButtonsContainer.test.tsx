import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import ChallengeButtonsContainer from "../ChallengeButtonsContainer";
import { ChallengeButtons } from "../ChallengeButtons";
import { defaultState } from "../../../test-utils/data-sample/state";
import { showModal } from "../../modal/modalSlice";
import { showSeekModal } from "../../seek-modal/seekModalSlice";

jest.mock("../../modal/modalSlice");
jest.mock("../../seek-modal/seekModalSlice");

describe("ChallengeButtonsContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(ChallengeButtonsContainer);

  describe("children components", () => {
    it("ChallengeButtons", () => {
      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeButtons).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(showModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const showModalReturnedValue = Symbol("showModal");

      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      const challengeButtons = testInstance.findByType(ChallengeButtons);

      const showModalFn = (showModal as unknown) as jest.Mock;
      showModalFn.mockClear();
      showModalFn.mockReturnValue(showModalReturnedValue);

      TestRenderer.act(() => {
        challengeButtons.props.onChallengeAi();
      });

      expect(showModalFn).toBeCalledTimes(1);
      expect(showModalFn).toBeCalledWith({
        name: "challengeAi",
        allowClose: true,
      });

      expect(dispatch).toBeCalledWith(showModalReturnedValue);
    });

    it("should call dispatch(showSeekModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const showSeekModalReturnedValue = Symbol("showSeekModal");

      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      const challengeButtons = testInstance.findByType(ChallengeButtons);

      const showSeekModalFn = (showSeekModal as unknown) as jest.Mock;
      showSeekModalFn.mockClear();
      showSeekModalFn.mockReturnValue(showSeekModalReturnedValue);

      TestRenderer.act(() => {
        challengeButtons.props.onCreateGame();
      });

      expect(showSeekModalFn).toBeCalledTimes(1);
      expect(showSeekModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(showSeekModalReturnedValue);
    });
  });
});

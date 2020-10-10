import React from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mountTest from "../../../test-utils/mountTest";
import CreateSeekFormContainer from "../CreateSeekFormContainer";
import { CreateSeekForm } from "../CreateSeekForm";
import ChallengeAiFormContainer from "../../challenge-ai-modal/ChallengeAiFormContainer";
import { ChallengeAiForm } from "../../challenge-ai-modal/ChallengeAiForm";
import { challengeAi, createSeek } from "../../challenge/challengeSlice";

jest.mock("../../challenge/challengeSlice");

describe("CreateSeekFormContainer", () => {
  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
    (useHistory().push as jest.Mock).mockClear();
  });

  mountTest(CreateSeekFormContainer);

  describe("children components", () => {
    it("contains CreateSeekForm", () => {
      const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(CreateSeekForm).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(createSeek())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
      const testInstance = testRenderer.root;

      const createSeekForm = testInstance.findByType(CreateSeekForm);

      const createSeekReturnedValue = Symbol("createSeek");

      const createSeekFn = createSeek as jest.Mock;
      createSeekFn.mockClear();
      createSeekFn.mockReturnValue(createSeekReturnedValue);

      TestRenderer.act(() => {
        createSeekForm.props.onSubmit({
          color: "random",
          clockLimit: 300,
          clockIncrement: 10,
        });
      });

      expect(createSeekFn).toBeCalledTimes(1);
      expect(createSeekFn).toBeCalledWith({
        color: "random",
        clockLimit: 300,
        clockIncrement: 10,
      });

      expect(dispatch).toBeCalledWith(createSeekReturnedValue);
    });
  });
});

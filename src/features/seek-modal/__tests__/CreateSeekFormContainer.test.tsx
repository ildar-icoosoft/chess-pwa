import React from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mountTest from "../../../test-utils/mountTest";
import CreateSeekFormContainer from "../CreateSeekFormContainer";
import { CreateSeekForm } from "../CreateSeekForm";

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
});

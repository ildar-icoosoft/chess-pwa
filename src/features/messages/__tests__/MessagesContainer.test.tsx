import { useSelector } from "react-redux";
import { defaultState } from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import MessagesContainer from "../MessagesContainer";
import TestRenderer from "react-test-renderer";
import React from "react";
import { Messages } from "../Messages";

describe("MessagesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(MessagesContainer);

  describe("children components", () => {
    it("Messages", () => {
      const testRenderer = TestRenderer.create(<MessagesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Messages).length).toBe(1);
    });
  });
});

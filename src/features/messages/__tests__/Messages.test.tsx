import mountTest from "../../../test-utils/mountTest";
import { Messages } from "../Messages";
import TestRenderer from "react-test-renderer";
import React from "react";
import { Toast } from "react-bootstrap";
import {
  defaultMessageSample,
  messageSample2,
} from "../../../test-utils/data-sample/message";

describe("Messages", () => {
  mountTest(Messages);

  describe("children components", () => {
    it("Toast", () => {
      const testRenderer = TestRenderer.create(<Messages />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Toast).length).toBe(0);

      testRenderer.update(
        <Messages items={[defaultMessageSample, messageSample2]} />
      );

      expect(testInstance.findAllByType(Toast).length).toBe(2);
    });
  });
});

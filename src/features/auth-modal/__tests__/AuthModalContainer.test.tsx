import mountTest from "../../../test-utils/mountTest";
import TestRenderer from "react-test-renderer";
import React from "react";
import { AuthModalContainer } from "../AuthModalContainer";
import { AuthModal } from "../AuthModal";

describe("AuthModalContainer", () => {
  mountTest(AuthModalContainer);

  describe("children components", () => {
    it("contains AuthModal", () => {
      const testRenderer = TestRenderer.create(<AuthModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(AuthModal).length).toBe(1);
    });
  });
});

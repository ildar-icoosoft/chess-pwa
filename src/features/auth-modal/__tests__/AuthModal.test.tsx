import mountTest from "../../../test-utils/mountTest";
import TestRenderer from "react-test-renderer";
import React from "react";
import { Modal } from "react-bootstrap";
import { AuthModal } from "../AuthModal";

describe("AuthModal", () => {
  mountTest(AuthModal);

  describe("children components", () => {
    it("contains Modal", () => {
      const testRenderer = TestRenderer.create(<AuthModal />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Modal).length).toBe(1);
    });
  });
});

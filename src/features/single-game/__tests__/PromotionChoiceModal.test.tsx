import mountTest from "../../../test-utils/mountTest";
import TestRenderer from "react-test-renderer";
import { Modal } from "react-bootstrap";
import React from "react";
import { PromotionChoiceModal } from "../PromotionChoiceModal";

describe("PromotionChoiceModal", () => {
  mountTest(PromotionChoiceModal);

  describe("children components", () => {
    it("contains Modal", () => {
      const testRenderer = TestRenderer.create(<PromotionChoiceModal />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Modal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Modal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<PromotionChoiceModal />);
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.show).toBeFalsy();

        testRenderer.update(<PromotionChoiceModal show />);

        expect(modal.props.show).toBeTruthy();
      });
    });
  });
});

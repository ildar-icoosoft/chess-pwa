import mountTest from "../../../test-utils/mountTest";
import TestRenderer from "react-test-renderer";
import React from "react";
import { AuthModalContainer } from "../AuthModalContainer";
import { AuthModal } from "../AuthModal";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import { useDispatch, useSelector } from "react-redux";

describe("AuthModalContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
  });

  mountTest(AuthModalContainer);

  describe("children components", () => {
    it("contains AuthModal", () => {
      const testRenderer = TestRenderer.create(<AuthModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(AuthModal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("AuthModal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<AuthModalContainer />);
        const testInstance = testRenderer.root;

        const authModal = testInstance.findByType(AuthModal);

        expect(authModal.props.show).toBeFalsy();

        const stateWithAuthModal = makeStateSample(
          {
            authModal: {
              isAuthModalVisible: true,
            },
          },
          defaultState
        );

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithAuthModal)
        );

        testRenderer.update(<AuthModalContainer />);

        expect(authModal.props.show).toBeTruthy();
      });
    });
  });
});

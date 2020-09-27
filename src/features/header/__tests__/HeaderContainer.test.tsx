import mountTest from "../../../test-utils/mountTest";
import HeaderContainer from "../HeaderContainer";
import TestRenderer from "react-test-renderer";
import React from "react";
import { Header } from "../Header";
import { useSelector } from "react-redux";
import {
  defaultState,
  stateWithDataSample,
} from "../../../test-utils/data-sample/state";
import userSample from "../../../test-utils/data-sample/user";

describe("HeaderContainer", () => {
  mountTest(HeaderContainer);

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  describe("children components", () => {
    it("contains Header", () => {
      const testRenderer = TestRenderer.create(<HeaderContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Header).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Header", () => {
      it("currentUser", () => {
        const testRenderer = TestRenderer.create(<HeaderContainer />);
        const testInstance = testRenderer.root;

        const header = testInstance.findByType(Header);

        expect(header.props.currentUser).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample)
        );

        testRenderer.update(<HeaderContainer />);

        expect(header.props.currentUser).toEqual(userSample);
      });
    });
  });
});

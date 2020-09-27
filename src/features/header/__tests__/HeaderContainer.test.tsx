import mountTest from "../../../test-utils/mountTest";
import HeaderContainer from "../HeaderContainer";
import TestRenderer from "react-test-renderer";
import React from "react";
import { Header } from "../Header";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultState,
  stateWithDataSample,
} from "../../../test-utils/data-sample/state";
import userSample from "../../../test-utils/data-sample/user";
import { logout } from "../../current-user/currentUserSlice";
import { showAuthModal } from "../../auth-modal/authModalSlice";

jest.mock("../../current-user/currentUserSlice");
jest.mock("../../auth-modal/authModalSlice");

describe("HeaderContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(HeaderContainer);

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

  describe("dispatch() calls", () => {
    it("should call dispatch(logout())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const logoutReturnedValue = Symbol("logout");

      const testRenderer = TestRenderer.create(<HeaderContainer />);
      const testInstance = testRenderer.root;

      const header = testInstance.findByType(Header);

      const logoutFn = logout as jest.Mock;
      logoutFn.mockClear();
      logoutFn.mockReturnValue(logoutReturnedValue);

      TestRenderer.act(() => {
        header.props.onLogout();
      });

      expect(logoutFn).toBeCalledTimes(1);
      expect(logoutFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(logoutReturnedValue);
    });

    it("should call dispatch(showAuthModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const showAuthModalReturnedValue = Symbol("showAuthModal");

      const testRenderer = TestRenderer.create(<HeaderContainer />);
      const testInstance = testRenderer.root;

      const header = testInstance.findByType(Header);

      const showAuthModalFn = (showAuthModal as unknown) as jest.Mock;
      showAuthModalFn.mockClear();
      showAuthModalFn.mockReturnValue(showAuthModalReturnedValue);

      TestRenderer.act(() => {
        header.props.onShowAuthModal();
      });

      expect(showAuthModalFn).toBeCalledTimes(1);
      expect(showAuthModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(showAuthModalReturnedValue);
    });
  });
});

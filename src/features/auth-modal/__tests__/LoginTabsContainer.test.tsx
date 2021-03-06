/* eslint-disable prefer-promise-reject-errors */

import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import LoginTabsContainer from "../LoginTabsContainer";
import { LoginForm } from "../LoginForm";
import { RegistrationForm } from "../RegistrationForm";
import { login, register } from "../../current-user/currentUserSlice";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../current-user/currentUserSlice");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("LoginTabsContainer", () => {
  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
  });

  mountTest(LoginTabsContainer);

  describe("children components", () => {
    it("contains LoginForm", async () => {
      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(LoginForm).length).toBe(1);
    });

    it("contains RegistrationForm", async () => {
      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(RegistrationForm).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(login())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const loginForm = testInstance.findByType(LoginForm);

      const loginReturnedValue = Symbol("login");

      const loginFn = login as jest.Mock;
      loginFn.mockClear();
      loginFn.mockReturnValue(loginReturnedValue);

      TestRenderer.act(() => {
        loginForm.props.onSubmit({
          email: "test@test.com",
          password: "123",
        });
      });

      expect(loginFn).toBeCalledTimes(1);
      expect(loginFn).toBeCalledWith({
        email: "test@test.com",
        password: "123",
      });

      expect(dispatch).toBeCalledWith(loginReturnedValue);
    });

    it("should handle dispatch(login()) fail", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 500,
        })
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const loginForm = testInstance.findByType(LoginForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        loginForm.props.onSubmit(
          {
            email: "test@test.com",
            password: "123",
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith("error text");
    });

    it("should call dispatch(register())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const registrationForm = testInstance.findByType(RegistrationForm);

      const registerReturnedValue = Symbol("register");

      const registerFn = register as jest.Mock;
      registerFn.mockClear();
      registerFn.mockReturnValue(registerReturnedValue);

      TestRenderer.act(() => {
        registrationForm.props.onSubmit({
          fullName: "David Wilson",
          email: "test@test.com",
          password: "123",
          confirmPassword: "123",
        });
      });

      expect(registerFn).toBeCalledTimes(1);
      expect(registerFn).toBeCalledWith({
        fullName: "David Wilson",
        email: "test@test.com",
        password: "123",
      });

      expect(dispatch).toBeCalledWith(registerReturnedValue);
    });

    it("should handle dispatch(register()) fail", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 500,
        })
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const registrationForm = testInstance.findByType(RegistrationForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        registrationForm.props.onSubmit(
          {
            email: "test@test.com",
            password: "123",
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith("error text");
    });
  });
});

import mountTest from "../../../test-utils/mountTest";
import { Header } from "../Header";
import React from "react";
import userSample from "../../../test-utils/data-sample/user";
import { fireEvent, render } from "@testing-library/react";

describe("Header", () => {
  mountTest(Header);

  describe("DOM structure", () => {
    it("should contain logout button", () => {
      const { queryByTestId, rerender } = render(
        <Header currentUser={userSample} />
      );

      expect(queryByTestId("logout-btn")).toBeInTheDocument();

      rerender(<Header />);

      expect(queryByTestId("logout-btn")).not.toBeInTheDocument();
    });

    it("should contain login button", () => {
      const { queryByTestId, rerender } = render(
        <Header currentUser={userSample} />
      );

      expect(queryByTestId("login-btn")).not.toBeInTheDocument();

      rerender(<Header />);

      expect(queryByTestId("login-btn")).toBeInTheDocument();
    });
  });

  describe("Events", () => {
    it("onLogout", () => {
      const onLogout = jest.fn();

      const { getByTestId } = render(
        <Header currentUser={userSample} onLogout={onLogout} />
      );

      fireEvent.click(getByTestId("logout-btn"));

      expect(onLogout).toBeCalledTimes(1);
      expect(onLogout).toBeCalledWith();
    });

    it("onShowAuthModal", () => {
      const onShowAuthModal = jest.fn();

      const { getByTestId } = render(
        <Header onShowAuthModal={onShowAuthModal} />
      );

      fireEvent.click(getByTestId("login-btn"));

      expect(onShowAuthModal).toBeCalledTimes(1);
      expect(onShowAuthModal).toBeCalledWith();
    });
  });
});

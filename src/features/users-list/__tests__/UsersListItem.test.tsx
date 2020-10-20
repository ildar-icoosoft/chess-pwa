import { render } from "@testing-library/react";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { UsersListItem } from "../UsersListItem";
import { userSample1 } from "../../../test-utils/data-sample/user";

describe("UsersListItem", () => {
  mountTest(UsersListItem);

  describe("DOM structure", () => {
    it("should contain nothing if no user", () => {
      const { container } = render(<UsersListItem />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player name", () => {
      const { getByTestId } = render(<UsersListItem user={userSample1} />);

      expect(getByTestId("user-name")).toHaveTextContent("Thomas Miller");
    });
  });
});

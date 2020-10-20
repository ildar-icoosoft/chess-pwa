import { render } from "@testing-library/react";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { UsersListItem } from "../UsersListItem";
import {
  makeUserSample,
  userSample1,
} from "../../../test-utils/data-sample/user";
import { SeeksListItem } from "../../seeks-list/SeeksListItem";
import { seekSample1 } from "../../../test-utils/data-sample/seek";

describe("UsersListItem", () => {
  mountTest(UsersListItem);

  describe("DOM structure", () => {
    it("should contain nothing if no user", () => {
      const { container } = render(<UsersListItem />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain online/offline icon", () => {
      const onlineUserSample = makeUserSample({
        isOnline: true,
      });
      const offlineUserSample = makeUserSample({
        isOnline: false,
      });

      const { queryByTestId, rerender } = render(
        <UsersListItem user={onlineUserSample} />
      );

      expect(queryByTestId("online-icon")).toBeInTheDocument();
      expect(queryByTestId("offline-icon")).not.toBeInTheDocument();

      rerender(<UsersListItem user={offlineUserSample} />);
      expect(queryByTestId("online-icon")).not.toBeInTheDocument();
      expect(queryByTestId("offline-icon")).toBeInTheDocument();
    });

    it("should contain player name", () => {
      const { getByTestId } = render(<UsersListItem user={userSample1} />);

      expect(getByTestId("user-name")).toHaveTextContent("Thomas Miller");
    });

    it("should contain currentUser class", () => {
      const { queryByTestId, rerender } = render(
        <UsersListItem user={userSample1} />
      );

      const seekWrapper = queryByTestId("user-wrapper");

      expect(seekWrapper).not.toHaveClass("currentUser");

      rerender(<UsersListItem user={userSample1} currentUserId={2} />);

      // this user is not current user
      expect(seekWrapper).not.toHaveClass("currentUser");

      rerender(<UsersListItem user={userSample1} currentUserId={1} />);

      expect(seekWrapper).toHaveClass("currentUser");
    });
  });
});

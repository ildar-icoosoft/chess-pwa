import React, { FC } from "react";
import User from "../../interfaces/User";
import cx from "classnames";
import css from "../seeks-list/SeeksListItem.module.scss";

export interface UsersListItemProps {
  currentUserId?: number | null;
  user?: User;
}

export const UsersListItem: FC<UsersListItemProps> = ({
  currentUserId = null,
  user,
}) => {
  if (!user) {
    return null;
  }

  return (
    <div
      data-testid="user-wrapper"
      className={cx("d-flex", "align-items-center", "border-bottom", {
        [css.currentUser]: user.id === currentUserId,
      })}
    >
      <div data-testid="user-name" className="mr-auto p-2">
        {user.fullName}
      </div>
    </div>
  );
};

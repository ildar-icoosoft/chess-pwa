import React, { FC } from "react";
import { Seek } from "../../interfaces/Seek";

export interface SeeksListItemProps {
  seek?: Seek;
}

export const SeeksListItem: FC<SeeksListItemProps> = ({ seek }) => {
  if (!seek) {
    return null;
  }

  return (
    <div>
      <div data-testid="user-name">{seek.createdBy.fullName}</div>
    </div>
  );
};

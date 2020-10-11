import React, { FC } from "react";
import { Seek } from "../../interfaces/Seek";
import { Button } from "react-bootstrap";

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
      <div data-testid="time-control">
        {seek.clockLimit / 60} + {seek.clockIncrement}
      </div>
      <div>
        <Button data-testid={`play-btn-${seek.id}`}>Play</Button>
      </div>
    </div>
  );
};

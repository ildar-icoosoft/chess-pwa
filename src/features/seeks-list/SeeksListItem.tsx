import React, { FC, useCallback } from "react";
import cx from "classnames";
import { Seek } from "../../interfaces/Seek";
import { Button } from "react-bootstrap";

export interface SeeksListItemProps {
  seek?: Seek;
  onPlay?(seekId: number): void;
  isSubmitting?: boolean;
}

export const SeeksListItem: FC<SeeksListItemProps> = ({
  seek,
  onPlay,
  isSubmitting = false,
}) => {
  const handlePlay = useCallback(() => {
    if (onPlay) {
      onPlay(seek!.id);
    }
  }, [onPlay]);

  if (!seek) {
    return null;
  }

  return (
    <div
      data-testid="seek-wrapper"
      className={cx({ gameIsStarted: seek.game })}
    >
      <div data-testid="user-name">{seek.createdBy.fullName}</div>
      <div data-testid="time-control">
        {seek.clockLimit / 60} + {seek.clockIncrement}
      </div>
      <div>
        <Button
          data-testid="play-btn"
          onClick={handlePlay}
          disabled={isSubmitting || !!seek.game}
        >
          Play
        </Button>
      </div>
    </div>
  );
};

import React, { FC, useCallback } from "react";
import cx from "classnames";
import { Seek } from "../../interfaces/Seek";
import { Button, Spinner } from "react-bootstrap";

export interface SeeksListItemProps {
  acceptInProcess?: number | null;
  seek?: Seek;
  onPlay?(seekId: number): void;
}

export const SeeksListItem: FC<SeeksListItemProps> = ({
  acceptInProcess = null,
  seek,
  onPlay,
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
          disabled={acceptInProcess !== null || !!seek.game}
        >
          {acceptInProcess === seek.id && (
            <Spinner animation="border" data-testid="play-btn-spinner">
              <span className="sr-only">Sending...</span>
            </Spinner>
          )}
          Play
        </Button>
      </div>
    </div>
  );
};

import React, { FC, useCallback } from "react";
import cx from "classnames";
import { Seek } from "../../interfaces/Seek";
import { Button, Spinner } from "react-bootstrap";
import css from "./SeeksListItem.module.scss";
import { ReactComponent as WhiteIcon } from "./icons/white.svg";
import { ReactComponent as BlackIcon } from "./icons/black.svg";
import { ReactComponent as RandomIcon } from "./icons/random.svg";

export interface SeeksListItemProps {
  acceptInProcess?: number | null;
  currentUserId?: number | null;
  seek?: Seek;
  onPlay?(seekId: number): void;
}

export const SeeksListItem: FC<SeeksListItemProps> = ({
  acceptInProcess = null,
  currentUserId = null,
  seek,
  onPlay,
}) => {
  const handlePlay = useCallback(() => {
    if (onPlay) {
      onPlay(seek!.id);
    }
  }, [onPlay, seek]);

  if (!seek) {
    return null;
  }

  return (
    <div
      data-testid="seek-wrapper"
      className={cx("d-flex", "align-items-center", "border-bottom", {
        [css.gameIsStarted]: seek.game,
      })}
    >
      <div className="d-flex">
        {seek.color === "white" && (
          <WhiteIcon data-testid="white-icon" className={css.colorIcon} />
        )}
        {seek.color === "black" && (
          <BlackIcon data-testid="black-icon" className={css.colorIcon} />
        )}
        {seek.color === "random" && (
          <RandomIcon data-testid="random-icon" className={css.colorIcon} />
        )}
      </div>
      <div data-testid="user-name" className="mr-auto p-2">
        {seek.createdBy.fullName}
      </div>
      <div data-testid="time-control" className="p-2">
        {seek.clockLimit / 60} + {seek.clockIncrement}
      </div>
      <div className="p-2">
        {currentUserId !== seek.createdBy.id && (
          <Button
            data-testid="play-btn"
            onClick={handlePlay}
            disabled={acceptInProcess !== null || !!seek.game}
          >
            {acceptInProcess === seek.id && (
              <Spinner
                animation="border"
                data-testid="play-btn-spinner"
                size="sm"
                className="mr-2"
              >
                <span className="sr-only">Sending...</span>
              </Spinner>
            )}
            Play
          </Button>
        )}
      </div>
    </div>
  );
};

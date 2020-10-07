import React, { FC, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRetweet,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

export interface GameControlPanelTopToolbarProps {
  isFirstMove?: boolean;
  isLastMove?: boolean;
  hasPrevMove?: boolean;
  hasNextMove?: boolean;
  onFlipBoard?(): void;
  onRewindToPrevMove?(): void;
  onRewindToNextMove?(): void;
  onRewindToFirstMove?(): void;
  onRewindToLastMove?(): void;
}

export const GameControlPanelTopToolbar: FC<GameControlPanelTopToolbarProps> = ({
  isFirstMove = false,
  isLastMove = false,
  hasPrevMove = false,
  hasNextMove = false,
  onFlipBoard,
  onRewindToPrevMove,
  onRewindToNextMove,
  onRewindToFirstMove,
  onRewindToLastMove,
}) => {
  const handleFlipBoard = useCallback(() => {
    if (onFlipBoard) {
      onFlipBoard();
    }
  }, [onFlipBoard]);
  const handleRewindToPrevMove = useCallback(() => {
    if (onRewindToPrevMove) {
      onRewindToPrevMove();
    }
  }, [onRewindToPrevMove]);
  const handleRewindToNextMove = useCallback(() => {
    if (onRewindToNextMove) {
      onRewindToNextMove();
    }
  }, [onRewindToNextMove]);
  const handleRewindToFirstMove = useCallback(() => {
    if (onRewindToFirstMove) {
      onRewindToFirstMove();
    }
  }, [onRewindToFirstMove]);
  const handleRewindToLastMove = useCallback(() => {
    if (onRewindToLastMove) {
      onRewindToLastMove();
    }
  }, [onRewindToLastMove]);

  return (
    <>
      <button
        type="button"
        data-testid="flip-board-btn"
        onClick={handleFlipBoard}
      >
        <FontAwesomeIcon icon={faRetweet} />
        <span className="sr-only">Flip board</span>
      </button>

      <button
        type="button"
        data-testid="rewind-to-first-move-btn"
        onClick={handleRewindToFirstMove}
        disabled={isFirstMove}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
        <span className="sr-only">Rewind to first move</span>
      </button>

      <button
        type="button"
        data-testid="rewind-to-prev-move-btn"
        onClick={handleRewindToPrevMove}
        disabled={!hasPrevMove}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        <span className="sr-only">Rewind to prev move</span>
      </button>

      <button
        type="button"
        data-testid="rewind-to-next-move-btn"
        onClick={handleRewindToNextMove}
        disabled={!hasNextMove}
      >
        <FontAwesomeIcon icon={faAngleRight} />
        <span className="sr-only">Rewind to next move</span>
      </button>

      <button
        type="button"
        data-testid="rewind-to-last-move-btn"
        onClick={handleRewindToLastMove}
        disabled={isLastMove}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
        <span className="sr-only">Rewind to last move</span>
      </button>
    </>
  );
};

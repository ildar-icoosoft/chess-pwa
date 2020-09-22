import React, { useCallback } from "react";
import { FC } from "react";

export interface GameControlPanelBottomToolbarProps {
  onAbortGame?(): void;
}

export const GameControlPanelBottomToolbar: FC<GameControlPanelBottomToolbarProps> = ({
  onAbortGame,
}) => {
  const handleAbortGame = useCallback(() => {
    if (onAbortGame) {
      onAbortGame();
    }
  }, [onAbortGame]);

  return (
    <button data-testid={"abort-game-btn"} onClick={handleAbortGame}>
      Abort
    </button>
  );
};

import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { GameControlPanel } from "./GameControlPanel";
import User from "../../interfaces/User";
import { PieceColor } from "../../types/PieceColor";
import { getMovesQnt } from "../../utils/chess";

export interface SingleGameControlPanelWrapperProps {
  game?: Game;
  currentUser?: User;
  isFlipped?: boolean;
  rewindToMoveIndex?: number | null;
  onFlipBoard?(): void;
  onAcceptDrawOffer?(): void;
  onDeclineDrawOffer?(): void;
  onAbortGame?(): void;
  onOfferDraw?(): void;
  onResignGame?(): void;
  onRewindToMove?(moveIndex: number | null): void;
}

export const GameControlPanelWrapper: FC<SingleGameControlPanelWrapperProps> = ({
  game,
  currentUser,
  isFlipped = false,
  rewindToMoveIndex = null,
  onFlipBoard,
  onAcceptDrawOffer,
  onDeclineDrawOffer,
  onAbortGame,
  onOfferDraw,
  onResignGame,
  onRewindToMove,
}) => {
  if (!game) {
    return null;
  }

  const movesQnt = getMovesQnt(game);

  let orientation: PieceColor = "white";
  if (currentUser && currentUser.id === game.black?.id) {
    orientation = "black";
  }
  if (isFlipped) {
    orientation = orientation === "white" ? "black" : "white";
  }

  let playerPiecesColor: PieceColor | null = null;
  if (currentUser) {
    if (currentUser.id === game.white?.id) {
      playerPiecesColor = "white";
    } else if (currentUser.id === game.black?.id) {
      playerPiecesColor = "black";
    }
  }

  let drawOfferSentByCurrentUser = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    game.drawOffer === playerPiecesColor
  ) {
    drawOfferSentByCurrentUser = true;
  }

  let drawOfferSentByOpponent = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    game.drawOffer !== null &&
    game.drawOffer !== playerPiecesColor
  ) {
    drawOfferSentByOpponent = true;
  }

  let canAbortGame = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    movesQnt < 2
  ) {
    canAbortGame = true;
  }

  let canResignGame = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    movesQnt > 1
  ) {
    canResignGame = true;
  }

  let canOfferDraw = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.drawOffer === null &&
    game.aiLevel === 0 &&
    game.status === "started" &&
    movesQnt > 1
  ) {
    canOfferDraw = true;
  }

  // @todo. use useCallback hook
  const handleRewindToMove = (moveIndex: number) => {
    if (onRewindToMove) {
      if (moveIndex === movesQnt) {
        onRewindToMove(null);
      } else {
        onRewindToMove(moveIndex);
      }
    }
  };

  // @todo. use useCallback hook
  const handleRewindToFirstMove = () => {
    if (onRewindToMove) {
      onRewindToMove(0);
    }
  };

  // @todo. use useCallback hook
  const handleRewindToLastMove = () => {
    if (onRewindToMove) {
      onRewindToMove(null);
    }
  };

  // @todo. use useCallback hook
  const handleRewindToPrevMove = () => {
    if (onRewindToMove) {
      if (rewindToMoveIndex === null) {
        onRewindToMove(movesQnt - 1);
      } else {
        onRewindToMove(rewindToMoveIndex - 1);
      }
    }
  };

  // @todo. use useCallback hook
  const handleRewindToNextMove = () => {
    if (onRewindToMove) {
      if (rewindToMoveIndex === movesQnt - 1) {
        onRewindToMove(null);
      } else {
        onRewindToMove((rewindToMoveIndex as number) + 1);
      }
    }
  };

  return (
    <GameControlPanel
      game={game}
      orientation={orientation}
      rewindToMoveIndex={rewindToMoveIndex}
      canAbortGame={canAbortGame}
      canResignGame={canResignGame}
      canOfferDraw={canOfferDraw}
      drawOfferSentByCurrentUser={drawOfferSentByCurrentUser}
      drawOfferSentByOpponent={drawOfferSentByOpponent}
      onAcceptDrawOffer={onAcceptDrawOffer}
      onDeclineDrawOffer={onDeclineDrawOffer}
      onFlipBoard={onFlipBoard}
      onAbortGame={onAbortGame}
      onOfferDraw={onOfferDraw}
      onResignGame={onResignGame}
      onRewindToMove={handleRewindToMove}
      onRewindToFirstMove={handleRewindToFirstMove}
      onRewindToLastMove={handleRewindToLastMove}
      onRewindToPrevMove={handleRewindToPrevMove}
      onRewindToNextMove={handleRewindToNextMove}
    />
  );
};

import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { GameControlPanel } from "./GameControlPanel";
import User from "../../interfaces/User";
import { PieceColor } from "ii-react-chessboard";
import { PieceColor as AppPieceColor } from "../../types/PieceColor";
import { ChessInstance } from "chess.js";
import makeChessInstance from "../../utils/makeChessInstance";

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
}

export const SingleGameControlPanelWrapper: FC<SingleGameControlPanelWrapperProps> = ({
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
}) => {
  if (!game) {
    return null;
  }

  const chessWithAllMoves: ChessInstance = makeChessInstance(game);

  const chess: ChessInstance =
    rewindToMoveIndex === null
      ? chessWithAllMoves
      : makeChessInstance(game, rewindToMoveIndex);

  const movesHistory = chessWithAllMoves.history({ verbose: true });

  let orientation = PieceColor.WHITE;
  if (currentUser && currentUser.id === game.black?.id) {
    orientation = PieceColor.BLACK;
  }
  if (isFlipped) {
    orientation =
      orientation === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
  }

  let playerPiecesColor: AppPieceColor | null = null;
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
    movesHistory.length < 2
  ) {
    canAbortGame = true;
  }

  let canResignGame = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    movesHistory.length > 1
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
    movesHistory.length > 1
  ) {
    canOfferDraw = true;
  }

  return (
    <GameControlPanel
      canAbortGame={canAbortGame}
      canOfferDraw={canOfferDraw}
      canResignGame={canResignGame}
      game={game}
      onAcceptDrawOffer={onAcceptDrawOffer}
      onDeclineDrawOffer={onDeclineDrawOffer}
      onFlipBoard={onFlipBoard}
      onAbortGame={onAbortGame}
      onOfferDraw={onOfferDraw}
      onResignGame={onResignGame}
      orientation={orientation}
      rewindToMoveIndex={rewindToMoveIndex}
      drawOfferSentByCurrentUser={drawOfferSentByCurrentUser}
      drawOfferSentByOpponent={drawOfferSentByOpponent}
    />
  );
};

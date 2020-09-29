import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { GameControlPanel } from "./GameControlPanel";
import User from "../../interfaces/User";
import { PieceColor } from "ii-react-chessboard";
import { PieceColor as AppPieceColor } from "../../types/PieceColor";

export interface SingleGameControlPanelWrapperProps {
  game?: Game;
  currentUser?: User;
  isFlipped?: boolean;
  rewindToMoveIndex?: number | null;
}

export const SingleGameControlPanelWrapper: FC<SingleGameControlPanelWrapperProps> = ({
  game,
  currentUser,
  isFlipped = false,
  rewindToMoveIndex = null,
}) => {
  if (!game) {
    return null;
  }

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

  return (
    <GameControlPanel
      game={game}
      orientation={orientation}
      rewindToMoveIndex={rewindToMoveIndex}
      drawOfferSentByCurrentUser={drawOfferSentByCurrentUser}
    />
  );
};

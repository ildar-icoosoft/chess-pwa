import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";
import { GameClock } from "./GameClock";
import { GameMoves } from "./GameMoves";
import { GameControlPanelUserName } from "./GameControlPanelUserName";
import { GameControlPanelTopToolbar } from "./GameControlPanelTopToolbar";
import { GameControlPanelBottomToolbar } from "./GameControlPanelBottomToolbar";
import makeChessInstance from "../../utils/makeChessInstance";
import { DrawOfferDialog } from "./DrawOfferDialog";

export interface GameControlPanelProps {
  game?: Game;
  orientation?: PieceColor;
  rewindToMoveIndex?: number | null;
  canAbortGame?: boolean;
  canResignGame?: boolean;
  drawOfferSentByCurrentUser?: boolean;
  drawOfferSentByOpponent?: boolean;
  onAcceptDrawOffer?(): void;
  onDeclineDrawOffer?(): void;
  onRewindToMove?(moveIndex: number): void;
  onFlipBoard?(): void;
  onRewindToPrevMove?(): void;
  onRewindToNextMove?(): void;
  onRewindToFirstMove?(): void;
  onRewindToLastMove?(): void;
  onAbortGame?(): void;
  onOfferDraw?(): void;
  onResignGame?(): void;
}

export const GameControlPanel: FC<GameControlPanelProps> = ({
  game,
  orientation = "white",
  rewindToMoveIndex = null,
  canAbortGame = false,
  canResignGame = false,
  drawOfferSentByCurrentUser = false,
  drawOfferSentByOpponent = false,
  onAcceptDrawOffer,
  onDeclineDrawOffer,
  onRewindToMove,
  onFlipBoard,
  onRewindToPrevMove,
  onRewindToNextMove,
  onRewindToFirstMove,
  onRewindToLastMove,
  onAbortGame,
  onOfferDraw,
  onResignGame,
}) => {
  if (!game) {
    return null;
  }

  const chess = makeChessInstance(game);

  const movesHistory = chess.history();

  const isFirstMove = movesHistory.length === 0 || rewindToMoveIndex === 0;

  const isLastMove = rewindToMoveIndex === null;

  const hasPrevMove = movesHistory.length > 0 && rewindToMoveIndex !== 0;

  const hasNextMove = movesHistory.length > 0 && rewindToMoveIndex !== null;

  return (
    <div>
      <GameClock time={orientation === "white" ? game.btime : game.wtime} />
      <GameControlPanelUserName
        game={game}
        color={orientation === "white" ? "black" : "white"}
      />
      <GameControlPanelTopToolbar
        isFirstMove={isFirstMove}
        isLastMove={isLastMove}
        hasPrevMove={hasPrevMove}
        hasNextMove={hasNextMove}
        onFlipBoard={onFlipBoard}
        onRewindToPrevMove={onRewindToPrevMove}
        onRewindToNextMove={onRewindToNextMove}
        onRewindToFirstMove={onRewindToFirstMove}
        onRewindToLastMove={onRewindToLastMove}
      />
      <GameMoves
        game={game}
        rewindToMoveIndex={rewindToMoveIndex}
        onRewindToMove={onRewindToMove}
      />
      {drawOfferSentByOpponent && (
        <DrawOfferDialog
          onAccept={onAcceptDrawOffer}
          onDecline={onDeclineDrawOffer}
        />
      )}
      {drawOfferSentByCurrentUser && (
        <div data-testid="draw-offer-sent-message">Draw offer sent</div>
      )}
      <GameControlPanelBottomToolbar
        canAbortGame={canAbortGame}
        canResignGame={canResignGame}
        onAbortGame={onAbortGame}
        onOfferDraw={onOfferDraw}
        onResignGame={onResignGame}
      />
      <GameControlPanelUserName
        game={game}
        color={orientation === "white" ? "white" : "black"}
      />
      <GameClock time={orientation === "white" ? game.wtime : game.btime} />
    </div>
  );
};

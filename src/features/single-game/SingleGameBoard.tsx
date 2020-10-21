import React, { FC, useEffect, useRef } from "react";
import {
  Board,
  getValidMoves,
  Move,
  PieceColor,
  ValidMoves,
} from "ii-react-chessboard";
import { ChessInstance } from "chess.js";
import Game from "../../interfaces/Game";
import makeChessInstance from "../../utils/makeChessInstance";
import User from "../../interfaces/User";
import css from "./SingleGameBoard.module.scss";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";
import GameStatus from "../../types/GameStatus";
import {
  playEndGameSound,
  playMoveSound,
  playStartGameSound,
} from "../../utils/sounds";

export interface SingleGameBoardProps {
  currentUser?: User;
  game?: Game;
  isFlipped?: boolean;
  onMove?(move: Move): void;
  rewindToMoveIndex?: number | null;
  isLoading?: boolean;
  error?: string | null;
}

export const SingleGameBoard: FC<SingleGameBoardProps> = ({
  currentUser,
  game,
  isFlipped = false,
  onMove,
  rewindToMoveIndex = null,
  isLoading = false,
  error = null,
}) => {
  // @todo. test useEffect
  const lastStatus = useRef<GameStatus | null>(null);
  useEffect(() => {
    if (!game) {
      return;
    }

    if (lastStatus.current === "started" && game.status !== "started") {
      playEndGameSound();
    }
    lastStatus.current = game.status;
  }, [game, lastStatus]);

  let movesHistory: Move[] = [];

  const premove = useRef<[Move, () => void, () => void] | null>(null);

  // @todo. test useEffect
  const lastSelectedMoveIndex = useRef<number | null>(null);
  useEffect(() => {
    if (!game) {
      return;
    }

    if (lastSelectedMoveIndex.current === null && movesHistory.length === 0) {
      playStartGameSound();
    }

    const selectedMoveIndex =
      rewindToMoveIndex === null ? movesHistory.length : rewindToMoveIndex;

    if (
      lastSelectedMoveIndex.current !== null &&
      selectedMoveIndex === lastSelectedMoveIndex.current + 1
    ) {
      playMoveSound();
    }

    lastSelectedMoveIndex.current = selectedMoveIndex;
  }, [game, lastSelectedMoveIndex, movesHistory.length, rewindToMoveIndex]);

  // @todo. test useEffect
  const lastMovesQnt = useRef<number | null>(null);
  useEffect(() => {
    if (!game) {
      return;
    }

    const movesQnt = movesHistory.length;

    if (
      lastMovesQnt.current !== null &&
      movesQnt === lastMovesQnt.current + 1 &&
      rewindToMoveIndex === null &&
      premove.current
    ) {
      premove.current[1](); // playPremove()
      premove.current = null;
    }

    lastMovesQnt.current = movesQnt;
  }, [game, premove, lastMovesQnt, movesHistory.length, rewindToMoveIndex]);

  // @todo. test useEffect
  useEffect(() => {
    if (rewindToMoveIndex !== null && premove.current) {
      premove.current[2](); // cancelPremove()
    }
  }, [premove, rewindToMoveIndex]);

  let boardContent = null;

  if (game) {
    const chessWithAllMoves: ChessInstance = makeChessInstance(game);

    const chess: ChessInstance =
      rewindToMoveIndex === null
        ? chessWithAllMoves
        : makeChessInstance(game, rewindToMoveIndex);

    const fen: string = chess.fen();

    const check: boolean = chess.in_check();

    const turnColor: PieceColor =
      game.turn === "white" ? PieceColor.WHITE : PieceColor.BLACK;

    const validMoves: ValidMoves = getValidMoves(chess);

    let viewOnly = true;
    if (
      currentUser &&
      (currentUser.id === game.white?.id ||
        currentUser.id === game.black?.id) &&
      game.status === "started" &&
      rewindToMoveIndex === null
    ) {
      viewOnly = false;
    }

    let movableColor: PieceColor | undefined;
    if (currentUser && currentUser.id === game.white?.id) {
      movableColor = PieceColor.WHITE;
    }
    if (currentUser && currentUser.id === game.black?.id) {
      movableColor = PieceColor.BLACK;
    }

    let orientation = PieceColor.WHITE;
    if (currentUser && currentUser.id === game.black?.id) {
      orientation = PieceColor.BLACK;
    }
    if (isFlipped) {
      orientation =
        orientation === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
    }

    movesHistory = chessWithAllMoves.history({ verbose: true });

    let lastMoveSquares: string[] | undefined;
    if (rewindToMoveIndex === null) {
      if (movesHistory.length) {
        const lastMove = movesHistory[movesHistory.length - 1];
        lastMoveSquares = [lastMove.from, lastMove.to];
      }
    } else if (rewindToMoveIndex > 0) {
      const lastMove = movesHistory[rewindToMoveIndex - 1];
      lastMoveSquares = [lastMove.from, lastMove.to];
    }

    const handleSetPremove = (
      move: Move,
      playPremove: () => void,
      cancelPremove: () => void
    ) => {
      premove.current = [move, playPremove, cancelPremove];
    };

    const handleUnsetPremove = () => {
      premove.current = null;

      console.log("handleUnsetPremove");
    };

    boardContent = (
      <div className={css.singleGameBoard}>
        <Board
          allowMarkers
          check={check}
          clickable
          draggable
          lastMoveSquares={lastMoveSquares}
          movableColor={movableColor}
          onMove={onMove}
          onSetPremove={handleSetPremove}
          onUnsetPremove={handleUnsetPremove}
          orientation={orientation}
          position={fen}
          premovable
          turnColor={turnColor}
          validMoves={validMoves}
          viewOnly={viewOnly}
        />
      </div>
    );
  }

  return (
    <div>
      <ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={!game}
      />
      {boardContent}
    </div>
  );
};

import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { Link } from "react-router-dom";
import { Board } from "ii-react-chessboard";
import makeChessInstance from "../../utils/makeChessInstance";
import css from "./GamePreviewsListItem.module.scss";
import { GamePreviewUserName } from "./GamePreviewUserName";
import { GamePreviewResult } from "./GamePreviewResult";
import { GamePreviewClock } from "./GamePreviewClock";

export interface GamePreviewsListItemProps {
  game?: Game;
}

export const GamePreviewsListItem: FC<GamePreviewsListItemProps> = ({
  game,
}) => {
  if (!game) {
    return null;
  }

  const fen: string = makeChessInstance(game).fen();

  return (
    <div className={css.gamePreview}>
      <div className={css.player}>
        <GamePreviewUserName game={game} color="black" />
        {game.status === "started" && <GamePreviewClock />}
        {game.status !== "started" && game.status !== "aborted" && (
          <GamePreviewResult game={game} color="black" />
        )}
      </div>
      <div className={css.board}>
        <Link to={`/game/${game.id}`}>
          <Board position={fen} viewOnly={false} width={240} />
        </Link>
      </div>
      <div className={css.player}>
        <GamePreviewUserName game={game} color="white" />
        {game.status === "started" && <GamePreviewClock />}
        {game.status !== "started" && game.status !== "aborted" && (
          <GamePreviewResult game={game} color="white" />
        )}
      </div>
    </div>
  );
};

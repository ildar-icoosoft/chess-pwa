import React, { FC } from "react";
import { chunk as _chunk } from "lodash";
import Game from "../../interfaces/Game";
import makeChessInstance from "../../utils/makeChessInstance";
import { Move } from "chess.js";

export interface GameMovesProps {
  game?: Game;
}

export const GameMoves: FC<GameMovesProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  const chess = makeChessInstance(game);

  const movesHistory = chess.history({ verbose: true });

  const movesPairs = _chunk(movesHistory, 2);

  return (
    <table>
      <tbody>
        {movesPairs.map((pair, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <div data-testid={`move-${formatMove(pair[0])}`}>
                {formatMove(pair[0])}
              </div>
            </td>
            <td>
              {pair[1] && (
                <div data-testid={`move-${formatMove(pair[1])}`}>
                  {formatMove(pair[1])}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const formatMove = (move: Move): string => {
  return `${move.from}${move.to}`;
};

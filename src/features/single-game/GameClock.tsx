import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";

export interface GameClockProps {
  game?: Game;
  turnColor?: PieceColor;
  color?: PieceColor;
}

export const GameClock: FC<GameClockProps> = ({ game, color = "white" }) => {
  if (!game) {
    return null;
  }

  let msec: number;
  if (color === "white") {
    msec = game.wtime;
  } else {
    msec = game.btime;
  }

  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    if (game.status !== "started") {
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimePassed((timePassed) => timePassed + 1000);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const time = moment()
    .startOf("day")
    .milliseconds(msec - timePassed)
    .format("mm : ss");

  return <div data-testid="time">{time}</div>;
};

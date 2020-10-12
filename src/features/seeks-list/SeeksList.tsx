import React, { FC } from "react";
import { Seek } from "../../interfaces/Seek";
import css from "../games-list/GamePreviewsList.module.scss";
import { SeeksListItem } from "./SeeksListItem";

export interface SeeksListProps {
  seeks?: Seek[];
  onPlay?(seekId: number): void;
}

export const SeeksList: FC<SeeksListProps> = ({ seeks = [], onPlay }) => {
  return (
    <div className={css.grid}>
      {seeks.map((item) => (
        <SeeksListItem seek={item} onPlay={onPlay} key={item.id} />
      ))}
    </div>
  );
};

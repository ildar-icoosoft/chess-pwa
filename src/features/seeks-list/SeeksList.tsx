import React, { FC } from "react";
import { Seek } from "../../interfaces/Seek";
import css from "../games-list/GamePreviewsList.module.scss";
import { SeeksListItem } from "./SeeksListItem";

export interface SeeksListProps {
  acceptInProcess?: number | null;
  seeks?: Seek[];
  onPlay?(seekId: number): void;
}

export const SeeksList: FC<SeeksListProps> = ({
  acceptInProcess = null,
  seeks = [],
  onPlay,
}) => {
  return (
    <div className={css.grid}>
      {seeks.map((item) => (
        <SeeksListItem
          acceptInProcess={acceptInProcess}
          seek={item}
          onPlay={onPlay}
          key={item.id}
        />
      ))}
    </div>
  );
};

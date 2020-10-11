import React, { FC } from "react";
import { Seek } from "../../interfaces/Seek";
import css from "../games-list/GamePreviewsList.module.scss";
import { SeeksListItem } from "./SeeksListItem";

export interface SeeksListProps {
  seeks?: Seek[];
}

export const SeeksList: FC<SeeksListProps> = ({ seeks = [] }) => {
  return (
    <div className={css.grid}>
      {seeks.map((item) => (
        <SeeksListItem seek={item} key={item.id} />
      ))}
    </div>
  );
};

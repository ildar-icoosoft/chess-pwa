import React, { FC } from "react";
import { useSelector } from "react-redux";
import { denormalize } from "normalizr";
import seekSchema from "../../normalizr/schemas/seekSchema";
import { RootState } from "../../app/rootReducer";
import { SeeksList } from "./SeeksList";

const SeeksListContainer: FC<unknown> = () => {
  const seeks = useSelector((state: RootState) =>
    denormalize(state.seeksList.items, [seekSchema], state.entities)
  );

  return <SeeksList seeks={seeks} />;
};

export default SeeksListContainer;

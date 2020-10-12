import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { denormalize } from "normalizr";
import seekSchema from "../../normalizr/schemas/seekSchema";
import { RootState } from "../../app/rootReducer";
import { SeeksList } from "./SeeksList";
import { acceptSeek } from "../challenge/challengeSlice";
import { AppDispatch } from "../../app/store";

const SeeksListContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const seeks = useSelector((state: RootState) =>
    denormalize(state.seeksList.items, [seekSchema], state.entities)
  );

  const handlePlay = useCallback(
    (seekId: number) => {
      return dispatch(acceptSeek(seekId));
      /*   .then((game: Game) => {
          history.push(`/game/${game.id}`);
        })
        .catch((err) => {
          if (err.statusCode === 401) {
            formikHelpers.setStatus("You must log in to create a game");
          } else if (err.statusCode === 0) {
            // request is aborted by client. do nothing
          } else {
            formikHelpers.setStatus("Internal server error");
          }
        });*/
    },
    [dispatch, history]
  );

  return <SeeksList seeks={seeks} onPlay={handlePlay} />;
};

export default SeeksListContainer;

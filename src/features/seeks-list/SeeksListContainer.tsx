import React, { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { denormalize } from "normalizr";
import seekSchema from "../../normalizr/schemas/seekSchema";
import { RootState } from "../../app/rootReducer";
import { SeeksList } from "./SeeksList";
import { acceptSeek } from "../challenge/challengeSlice";
import { AppDispatch } from "../../app/store";
import Game from "../../interfaces/Game";
import { useHistory } from "react-router-dom";
import { Toast } from "react-bootstrap";

const SeeksListContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [playError, setPlayError] = useState<string | null>(null);

  const history = useHistory();

  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.userId
  );

  const seeks = useSelector((state: RootState) =>
    denormalize(state.seeksList.items, [seekSchema], state.entities)
  );

  const acceptSeekRequest = useSelector(
    (state: RootState) => state.acceptSeekRequest
  );

  const acceptInProcess = acceptSeekRequest.inProcess
    ? acceptSeekRequest.itemId
    : null;

  const handlePlay = useCallback(
    (seekId: number) => {
      return dispatch(acceptSeek(seekId))
        .then((game: Game) => {
          history.push(`/game/${game.id}`);
        })
        .catch((err) => {
          if (err.statusCode === 401) {
            setPlayError("You must log in to create a game");
          } else {
            setPlayError("Internal server error");
          }
        });
    },
    [dispatch, history]
  );

  return (
    <>
      <Toast
        onClose={() => setPlayError(null)}
        show={playError !== null}
        delay={3000}
        autohide
        animation={false}
      >
        <Toast.Body>{playError}</Toast.Body>
      </Toast>
      <SeeksList
        currentUserId={currentUserId}
        seeks={seeks}
        onPlay={handlePlay}
        acceptInProcess={acceptInProcess}
      />
    </>
  );
};

export default SeeksListContainer;

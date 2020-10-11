import React, { FC, useCallback } from "react";
import { CreateSeekForm } from "./CreateSeekForm";
import { FormikHelpers } from "formik";
import { createSeek } from "../challenge/challengeSlice";
import { CreateSeekData } from "../../interfaces/CreateSeekData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import Game from "../../interfaces/Game";
import { useHistory } from "react-router-dom";
import ioClient from "../../services/ioClient";

const CreateSeekFormContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const handleSubmit = useCallback(
    (values: CreateSeekData, formikHelpers: FormikHelpers<CreateSeekData>) => {
      return dispatch(createSeek(values))
        .then((game: Game) => {
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
        });
    },
    [dispatch, history]
  );

  // @todo. This is temporary solution. We need to use HTTP requests instead of sockets and we need
  //  to abort the createSeek HTTP request instead of sockets disconnect.
  const handleAbort = useCallback(() => {
    // @ts-ignore
    ioClient.socket.disconnect();
    ioClient.socket.reconnect();
  }, []);

  return <CreateSeekForm onSubmit={handleSubmit} onAbort={handleAbort} />;
};

export default CreateSeekFormContainer;

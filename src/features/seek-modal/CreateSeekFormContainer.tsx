import React, { FC, useCallback } from "react";
import { CreateSeekForm } from "./CreateSeekForm";
import { FormikHelpers } from "formik";
import { createSeek } from "../challenge/challengeSlice";
import { CreateSeekData } from "../../interfaces/CreateSeekData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import Game from "../../interfaces/Game";
import { useHistory } from "react-router-dom";

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
          } else {
            formikHelpers.setStatus("Internal server error");
          }
        });
    },
    [dispatch]
  );

  return <CreateSeekForm onSubmit={handleSubmit} />;
};

export default CreateSeekFormContainer;

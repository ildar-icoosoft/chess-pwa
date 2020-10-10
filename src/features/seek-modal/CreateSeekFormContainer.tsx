import React, { FC, useCallback } from "react";
import { CreateSeekForm } from "./CreateSeekForm";
import { FormikHelpers } from "formik";
import { createSeek } from "../challenge/challengeSlice";
import { CreateSeekData } from "../../interfaces/CreateSeekData";
import { CreateSeekResult } from "../../interfaces/CreateSeekResult";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

const CreateSeekFormContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = useCallback(
    (values: CreateSeekData, formikHelpers: FormikHelpers<CreateSeekData>) => {
      return dispatch(createSeek(values))
        .then((result: CreateSeekResult) => {
          // history.push(`/game/${game.id}`);
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

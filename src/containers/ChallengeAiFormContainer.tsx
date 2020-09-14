import React, { FC, useCallback } from "react";
import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { ChallengeAiForm } from "../components/ChallengeAiForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { challengeAi } from "../redux/slices/challengeSlice";
import { ChallengeAiData } from "../interfaces/ChallengeAiData";
import Game from "../interfaces/Game";

export const ChallengeAiFormContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const challengeAiAndOpenGamePage = useCallback(
    (
      values: ChallengeAiData,
      formikHelpers: FormikHelpers<ChallengeAiData>
    ) => {
      return dispatch(challengeAi(values))
        .then((game: Game) => {
          history.push(`/game/${game.id}`);
        })
        .catch((err) => {
          if (err.statusCode === 401) {
            formikHelpers.setStatus("You must log in to play with computer");
          } else {
            formikHelpers.setStatus("Internal server error");
          }
        });
    },
    [dispatch]
  );

  return <ChallengeAiForm onSubmit={challengeAiAndOpenGamePage} />;
};

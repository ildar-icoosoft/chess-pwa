import React, { FC, useCallback } from "react";
import { ChallengeAiForm } from "../components/ChallengeAiForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { challengeAi } from "../redux/slices/entitiesSlice";
import { ChallengeAiData } from "../interfaces/ChallengeAiData";
import { FormikHelpers } from "formik";

export const ChallengeAiFormContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const challengeAiAndOpenGamePage = useCallback(
    (
      values: ChallengeAiData,
      formikHelpers: FormikHelpers<ChallengeAiData>
    ) => {
      return dispatch(challengeAi(values)).catch((err) => {
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

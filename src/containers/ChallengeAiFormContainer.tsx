import React, { FC } from "react";
import { ChallengeAiForm } from "../components/ChallengeAiForm";
import { challengeAi as apiChallengeAi } from "../services/api";

export const ChallengeAiFormContainer: FC<unknown> = () => {
  const challengeAi = () => {
    apiChallengeAi({
      level: 3,
      color: "random",
      clockLimit: 400,
      clockIncrement: 4,
    })
      .then((res) => {
        debugger;
      })
      .catch((err) => {
        debugger;
      });
  };

  return <ChallengeAiForm onSubmit={challengeAi} />;
};

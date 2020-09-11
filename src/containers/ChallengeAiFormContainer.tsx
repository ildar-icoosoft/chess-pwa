import React, { FC } from "react";
import { ChallengeAiForm } from "../components/ChallengeAiForm";
import { challengeAi as apiChallengeAi } from "../services/api";
import { ChallengeAiData } from "../interfaces/ChallengeAiData";

export const ChallengeAiFormContainer: FC<unknown> = () => {
  const challengeAi = (data: ChallengeAiData) => {
    return apiChallengeAi(data)
      .then((res) => {})
      .catch((err) => {});
  };

  return <ChallengeAiForm onSubmit={challengeAi} />;
};

import React, { FC } from "react";
import { ChallengeAiModal } from "./ChallengeAiModal";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

export const ChallengeAiModalContainer: FC<unknown> = () => {
  const { isChallengeAiModalVisible } = useSelector(
    (state: RootState) => state.challengeAiModal
  );

  return <ChallengeAiModal show={isChallengeAiModalVisible} />;
};

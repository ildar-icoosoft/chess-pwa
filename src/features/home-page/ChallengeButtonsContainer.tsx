import React, { FC, useCallback } from "react";
import { ChallengeButtons } from "./ChallengeButtons";
import { useDispatch } from "react-redux";
import { showChallengeAiModal } from "../challenge-ai-modal/challengeAiModalSlice";

const ChallengeButtonsContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const handleChallengeAi = useCallback(() => {
    dispatch(showChallengeAiModal());
  }, [dispatch]);

  return <ChallengeButtons onChallengeAi={handleChallengeAi} />;
};

export default ChallengeButtonsContainer;

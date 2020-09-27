import React, { FC, useCallback } from "react";
import { ChallengeAiModal } from "./ChallengeAiModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { hideChallengeAiModal } from "../challenge-ai-modal/challengeAiModalSlice";

export const ChallengeAiModalContainer: FC<unknown> = () => {
  const { isChallengeAiModalVisible } = useSelector(
    (state: RootState) => state.challengeAiModal
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideChallengeAiModal());
  }, [dispatch]);

  return (
    <ChallengeAiModal show={isChallengeAiModalVisible} onHide={handleHide} />
  );
};

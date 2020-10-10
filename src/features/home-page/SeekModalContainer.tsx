import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChallengeAiModal } from "./ChallengeAiModal";
import { RootState } from "../../app/rootReducer";
import { hideChallengeAiModal } from "../challenge-ai-modal/challengeAiModalSlice";

const SeekModalContainer: FC<unknown> = () => {
  return null;
  /*const { isSeekModalVisible } = useSelector(
    (state: RootState) => state.seekModal
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideChallengeAiModal());
  }, [dispatch]);

  return (
    <ChallengeAiModal show={isChallengeAiModalVisible} onHide={handleHide} />
  );*/
};

export default SeekModalContainer;

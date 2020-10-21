import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ChallengeButtons } from "./ChallengeButtons";
import { showSeekModal } from "../seek-modal/seekModalSlice";
import { showModal } from "../modal/modalSlice";

const ChallengeButtonsContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const handleChallengeAi = useCallback(() => {
    dispatch(
      showModal({
        name: "challengeAi",
        allowClose: true,
      })
    );
  }, [dispatch]);

  const handleCreateGame = useCallback(() => {
    dispatch(showSeekModal());
  }, [dispatch]);

  return (
    <ChallengeButtons
      onChallengeAi={handleChallengeAi}
      onCreateGame={handleCreateGame}
    />
  );
};

export default ChallengeButtonsContainer;

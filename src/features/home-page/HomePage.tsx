import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OngoingGamesContainer from "../ongoing-games/OngoingGamesContainer";
import ChallengeAiFormContainer from "../challenge-ai-modal/ChallengeAiFormContainer";

import { RootState } from "../../app/rootReducer";
import { hideChallengeAiModal } from "../challenge-ai-modal/challengeAiModalSlice";
import { AppDispatch } from "../../app/store";
import ChallengeButtonsContainer from "./ChallengeButtonsContainer";
import { ChallengeAiModalContainer } from "./ChallengeAiModalContainer";

const HomePage: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isChallengeAiModalVisible } = useSelector(
    (state: RootState) => state.challengeAiModal
  );

  return (
    <>
      <Modal
        show={isChallengeAiModalVisible}
        onHide={() => dispatch(hideChallengeAiModal())}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Play with the computer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ChallengeAiFormContainer />
        </Modal.Body>
      </Modal>

      <ChallengeAiModalContainer />
      <ChallengeButtonsContainer />
      <OngoingGamesContainer />
    </>
  );
};

export default HomePage;

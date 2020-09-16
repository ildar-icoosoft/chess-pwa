import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OngoingGamesContainer from "../containers/OngoingGamesContainer";
import ChallengeAiFormContainer from "../containers/ChallengeAiFormContainer";

import { RootState } from "../app/rootReducer";
import {
  hideChallengeAiModal,
  showChallengeAiModal,
} from "../redux/slices/challengeAiModalSlice";
import { AppDispatch } from "../app/store";

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
          <Modal.Title>Play with the computer test11</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ChallengeAiFormContainer />
        </Modal.Body>
      </Modal>
      <Button
        variant="primary"
        onClick={() => dispatch(showChallengeAiModal())}
      >
        Play with the computer
      </Button>
      <OngoingGamesContainer />
    </>
  );
};

export default HomePage;

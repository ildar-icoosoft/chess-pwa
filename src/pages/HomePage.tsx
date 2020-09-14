import React, { FC, useState } from "react";
import OngoingGamesContainer from "../containers/OngoingGamesContainer";
import { Button, Modal } from "react-bootstrap";
import { ChallengeAiFormContainer } from "../containers/ChallengeAiFormContainer";

const HomePage: FC<unknown> = () => {
  const [showChallengeAiModal, setShowChallengeAiModal] = useState(false);

  return (
    <>
      <Modal
        show={showChallengeAiModal}
        onHide={() => setShowChallengeAiModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Play with the computer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ChallengeAiFormContainer />
        </Modal.Body>
      </Modal>
      <Button variant="primary" onClick={() => setShowChallengeAiModal(true)}>
        Play with the computer
      </Button>
      <OngoingGamesContainer />
    </>
  );
};

export default HomePage;

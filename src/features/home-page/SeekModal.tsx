import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import CreateSeekFormContainer from "../seek-modal/CreateSeekFormContainer";

export interface SeekModalProps {
  show?: boolean;
  onHide?(): void;
}

export const SeekModal: FC<SeekModalProps> = ({ show = false, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create a game</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CreateSeekFormContainer />
      </Modal.Body>
    </Modal>
  );
};

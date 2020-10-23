import React, { FC } from "react";
import { PieceType } from "chess.js";
import { PieceColor } from "../../types/PieceColor";
import { Modal } from "react-bootstrap";

export interface PromotionChoiceModalProps {
  show?: boolean;
  turnColor?: PieceColor;
  onPromotion?: (promotionPiece: Exclude<PieceType, "p">) => void;
}

export const PromotionChoiceModal: FC<PromotionChoiceModalProps> = ({
  show = false,
}) => {
  return (
    <Modal show={show} animation={false}>
      <Modal.Body>{/*<ChallengeAiFormContainer />*/}</Modal.Body>
    </Modal>
  );
};

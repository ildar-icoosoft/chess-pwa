import React, { FC, useCallback } from "react";
import { MessageItemState } from "./messagesSlice";
import { Toast } from "react-bootstrap";

export interface MessagesProps {
  items?: MessageItemState[];
  onHideMessage?(messageId: string): void;
}

export const Messages: FC<MessagesProps> = ({ items = [], onHideMessage }) => {
  const makeHideMessageHandler = useCallback(
    (messageId: string) => () => {
      if (onHideMessage) {
        onHideMessage(messageId);
      }
    },
    [onHideMessage]
  );

  return (
    <>
      {items.map((item, index) => (
        <Toast
          key={`${item.id}-${index}`}
          onClose={makeHideMessageHandler(item.id)}
          show
          delay={3000}
          autohide
          animation={false}
        >
          <Toast.Body>{item.body}</Toast.Body>
        </Toast>
      ))}
    </>
  );
};

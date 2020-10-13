import React, { FC } from "react";
import { MessageItemState } from "./messagesSlice";
import { Toast } from "react-bootstrap";

export interface MessagesProps {
  items?: MessageItemState[];
  onHideMessage?(messageId: string): void;
}

export const Messages: FC<MessagesProps> = ({ items = [], onHideMessage }) => {
  const makeHideMessageCallback = (messageId: string) => () => {
    if (onHideMessage) {
      onHideMessage(messageId);
    }
  };

  return (
    <>
      {items.map((item) => (
        <Toast
          key={item.id}
          onClose={makeHideMessageCallback(item.id)}
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

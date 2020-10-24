import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { ChatMessagesListContainer } from "./ChatMessagesListContainer";
import { PostChatMessageFormContainer } from "./PostChatMessageFormContainer";

export interface ChatProps {
  gameId: number;
}

export const Chat: FC<ChatProps> = ({ gameId }) => {
  return (
    <Card>
      <Card.Header>Chat room</Card.Header>
      <Card.Body>
        <ChatMessagesListContainer gameId={gameId} />
      </Card.Body>
      <Card.Footer>
        <PostChatMessageFormContainer gameId={gameId} />
      </Card.Footer>
    </Card>
  );
};

import React, { FC } from "react";
import { ChatMessagesListContainer } from "./ChatMessagesListContainer";
import { PostChatMessageFormContainer } from "./PostChatMessageFormContainer";

export interface ChatProps {
  gameId: number;
}

export const Chat: FC<ChatProps> = ({ gameId }) => {
  return (
    <>
      <ChatMessagesListContainer gameId={gameId} />
      <PostChatMessageFormContainer gameId={gameId} />
    </>
  );
};

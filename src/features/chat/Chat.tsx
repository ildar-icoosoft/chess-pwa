import React, { FC } from "react";
import { ChatMessagesContainer } from "./ChatMessagesContainer";
import { PostChatMessageFormContainer } from "./PostChatMessageFormContainer";

export interface ChatProps {
  gameId: number;
}

export const Chat: FC<ChatProps> = ({ gameId }) => {
  return (
    <>
      <ChatMessagesContainer gameId={gameId} />
      <PostChatMessageFormContainer gameId={gameId} />
    </>
  );
};

import React, { FC } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";
import { ChatMessagesListItem } from "./ChatMessagesListItem";

export interface ChatMessagesListProps {
  currentUserId?: number | null;
  messages?: ChatMessage[];
  isLoading?: boolean;
  error?: string | null;
}

export const ChatMessagesList: FC<ChatMessagesListProps> = ({
  currentUserId = null,
  messages = [],
  isLoading = false,
  error = null,
}) => {
  return (
    <div>
      {/*<ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={seeks.length === 0}
        emptyContentMessage="Nobody is waiting for opponent"
      />*/}
      <div>
        {messages.map((item) => (
          <ChatMessagesListItem
            currentUserId={currentUserId}
            message={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

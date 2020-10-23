import React, { FC } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";
import { ChatMessagesListItem } from "./ChatMessagesListItem";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";

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
      <ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={messages.length === 0}
        showEmptyContentMessage={false}
      />
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

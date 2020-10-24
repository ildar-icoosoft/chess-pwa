import React, { FC } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";
import { ChatMessagesListItem } from "./ChatMessagesListItem";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";
import css from "./ChatMessagesList.module.scss";

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
    <div className={css.chatMessages}>
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

import React, { FC } from "react";
import cx from "classnames";
import { ChatMessage } from "../../interfaces/ChatMessage";
import css from "./ChatMessagesListItem.module.scss";

export interface ChatMessagesListItemProps {
  message?: ChatMessage;
  currentUserId?: number | null;
}

export const ChatMessagesListItem: FC<ChatMessagesListItemProps> = ({
  message,
  currentUserId = null,
}) => {
  if (!message) {
    return null;
  }

  return (
    <div
      data-testid="message-wrapper"
      className={cx({
        [css.currentUserMessage]: message.createdBy.id === currentUserId,
      })}
    >
      <div data-testid="user-name">{message.createdBy.fullName}</div>
      <div data-testid="message-text">{message.text}</div>
    </div>
  );
};

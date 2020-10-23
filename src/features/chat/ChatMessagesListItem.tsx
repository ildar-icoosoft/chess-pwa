import { FC } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";
import { Seek } from "../../interfaces/Seek";

export interface ChatMessagesListItemProps {
  message?: ChatMessage;
  currentUserId?: number | null;
}

export const ChatMessagesListItem: FC<ChatMessagesListItemProps> = () => null;

import { FC } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";

export interface ChatMessagesListProps {
  currentUserId?: number | null;
  messages?: ChatMessage[];
  isLoading?: boolean;
  error?: string | null;
}

export const ChatMessagesList: FC<ChatMessagesListProps> = () => null;

import { FC } from "react";
import Game from "../../interfaces/Game";

export interface ChatMessagesListProps {
  game?: Game;
  currentUserId: number;
}

export const ChatMessagesList: FC<ChatMessagesListProps> = () => null;

import { FC } from "react";
import Game from "../../interfaces/Game";

export interface ChatMessagesProps {
  game?: Game;
  currentUserId: number;
}

export const ChatMessages: FC<ChatMessagesProps> = () => null;

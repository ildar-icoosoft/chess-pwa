import { FC } from "react";
import { MessageItemState } from "./messagesSlice";

export interface MessagesProps {
  items?: MessageItemState[];
  onHideMessage?(messageId: string): void;
}

export const Messages: FC<MessagesProps> = () => null;

import { ChatMessage } from "../../interfaces/ChatMessage";
import { userSample1 } from "./user";
import NormalizedChatMessageEntity from "../../normalizr/interfaces/NormalizedChatMessageEntity";

export const chatMessageSample1: ChatMessage = {
  id: 1,
  createdBy: userSample1,
  game: 1,
  text: "Good game!",
};

export const normalizedChatMessageSample1: NormalizedChatMessageEntity = {
  id: 1,
  createdBy: 1,
  game: 1,
  text: "Good game!",
};

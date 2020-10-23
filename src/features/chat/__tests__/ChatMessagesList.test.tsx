import mountTest from "../../../test-utils/mountTest";
import TestRenderer from "react-test-renderer";
import { ChatMessagesList } from "../ChatMessagesList";
import React from "react";
import { ChatMessagesListItem } from "../ChatMessagesListItem";
import {
  chatMessageSample1,
  chatMessageSample2,
} from "../../../test-utils/data-sample/chat-message";

const messagesListSample = [chatMessageSample1, chatMessageSample2];

describe("ChatMessagesList", () => {
  mountTest(ChatMessagesList);

  describe("children components", () => {
    it("contains ChatMessagesListItem", () => {
      const testRenderer = TestRenderer.create(<ChatMessagesList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChatMessagesListItem).length).toBe(0);

      testRenderer.update(<ChatMessagesList messages={messagesListSample} />);

      expect(testInstance.findAllByType(ChatMessagesListItem).length).toBe(2);
    });
  });

  describe("children components props", () => {
    describe("ChatMessagesListItem", () => {
      it("message", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesList messages={messagesListSample} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListItems = testInstance.findAllByType(
          ChatMessagesListItem
        );

        expect(chatMessagesListItems[0].props.message).toBe(chatMessageSample1);
        expect(chatMessagesListItems[1].props.message).toBe(chatMessageSample2);
      });

      it("currentUserId", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesList messages={messagesListSample} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListItems = testInstance.findAllByType(
          ChatMessagesListItem
        );

        expect(chatMessagesListItems[0].props.currentUserId).toBeNull();
        expect(chatMessagesListItems[1].props.currentUserId).toBeNull();

        testRenderer.update(
          <ChatMessagesList messages={messagesListSample} currentUserId={3} />
        );

        expect(chatMessagesListItems[0].props.currentUserId).toBe(3);
        expect(chatMessagesListItems[1].props.currentUserId).toBe(3);
      });
    });
  });
});

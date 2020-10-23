import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mountTest from "../../../test-utils/mountTest";
import TestRenderer from "react-test-renderer";
import React from "react";
import { PostChatMessageFormContainer } from "../PostChatMessageFormContainer";
import { PostChatMessageForm } from "../PostChatMessageForm";
import { createChatMessage } from "../chatSlice";

jest.mock("../chatSlice");

describe("PostChatMessageFormContainer", () => {
  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
    (useHistory().push as jest.Mock).mockClear();
  });

  mountTest(PostChatMessageFormContainer, { gameId: 1 });

  describe("children components", () => {
    it("contains ChallengeAiForm", () => {
      const testRenderer = TestRenderer.create(
        <PostChatMessageFormContainer gameId={1} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(PostChatMessageForm).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(createChatMessage())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(
        <PostChatMessageFormContainer gameId={1} />
      );
      const testInstance = testRenderer.root;

      const postChatMessageForm = testInstance.findByType(PostChatMessageForm);

      const createChatMessageReturnedValue = Symbol("createChatMessage");

      const createChatMessageFn = createChatMessage as jest.Mock;
      createChatMessageFn.mockClear();
      createChatMessageFn.mockReturnValue(createChatMessageReturnedValue);

      TestRenderer.act(() => {
        postChatMessageForm.props.onSubmit({
          text: "Hello",
        });
      });

      expect(createChatMessageFn).toBeCalledTimes(1);
      expect(createChatMessageFn).toBeCalledWith(1, "Hello");

      expect(dispatch).toBeCalledWith(createChatMessageReturnedValue);
    });
  });
});

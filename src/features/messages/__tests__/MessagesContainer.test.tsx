import { useDispatch, useSelector } from "react-redux";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import MessagesContainer from "../MessagesContainer";
import TestRenderer from "react-test-renderer";
import React from "react";
import { Messages } from "../Messages";
import { hideMessage } from "../messagesSlice";

jest.mock("../messagesSlice");

const stateWithMessages = makeStateSample({
  messages: [
    {
      id: "message1",
      body: "message text 1",
    },
    {
      id: "message2",
      body: "message text 2",
    },
  ],
});

describe("MessagesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(MessagesContainer);

  describe("children components", () => {
    it("Messages", () => {
      const testRenderer = TestRenderer.create(<MessagesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Messages).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Messages", () => {
      it("items", () => {
        const testRenderer = TestRenderer.create(<MessagesContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(Messages);

        expect(seeksListComponent.props.items).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithMessages)
        );

        testRenderer.update(<MessagesContainer />);

        expect(seeksListComponent.props.items).toEqual([
          {
            id: "message1",
            body: "message text 1",
          },
          {
            id: "message2",
            body: "message text 2",
          },
        ]);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(hideMessage())", () => {
      const dispatch = useDispatch<jest.Mock>();

      const testRenderer = TestRenderer.create(<MessagesContainer />);
      const testInstance = testRenderer.root;

      const messages = testInstance.findByType(Messages);

      const hideMessageReturnedValue = Symbol("hideMessage");

      const hideMessageFn = (hideMessage as unknown) as jest.Mock;
      hideMessageFn.mockClear();
      hideMessageFn.mockReturnValue(hideMessageReturnedValue);

      TestRenderer.act(() => {
        messages.props.onHideMessage("message1");
      });

      expect(hideMessageFn).toBeCalledTimes(1);
      expect(hideMessageFn).toBeCalledWith("message1");

      expect(dispatch).toBeCalledWith(hideMessageReturnedValue);
    });
  });
});

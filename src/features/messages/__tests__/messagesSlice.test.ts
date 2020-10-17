import messagesReducer, { showMessage, hideMessage } from "../messagesSlice";
import { acceptSeekError } from "../../challenge/challengeSlice";
import { makeMoveError } from "../../move/moveSlice";
import { getCurrentUserError } from "../../current-user/currentUserSlice";

describe("messagesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      messagesReducer(undefined, {
        type: "",
      })
    ).toEqual([]);
  });

  it("should handle showMessage", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: showMessage.type,
          payload: {
            id: "message2",
            body: "some message 2",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "message2",
        body: "some message 2",
      },
    ]);
  });

  it("should handle hideMessage", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
          {
            id: "message2",
            body: "some message 2",
          },
        ],
        {
          type: hideMessage.type,
          payload: "message2",
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
    ]);
  });

  it("should handle acceptSeekError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: acceptSeekError.type,
          payload: {
            itemId: 5,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "acceptSeekError",
        body: "error text",
      },
    ]);
  });

  it("should handle makeMoveError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: makeMoveError.type,
          payload: "error text",
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "makeMoveError",
        body: "error text",
      },
    ]);
  });

  it("should handle getCurrentUserError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: getCurrentUserError.type,
          payload: "error text",
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "getCurrentUserError",
        body: "error text",
      },
    ]);
  });
});

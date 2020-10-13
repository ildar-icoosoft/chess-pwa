import messagesReducer, {
  showMessage,
  hideMessage,
} from "../../messages/messagesSlice";

describe("messagesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      messagesReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle showMessage", () => {
    expect(
      messagesReducer(
        {
          message1: {
            body: "some message",
          },
        },
        {
          type: showMessage.type,
          payload: {
            id: "message2",
            body: "some message 2",
          },
        }
      )
    ).toEqual({
      message1: {
        body: "some message",
      },
      message2: {
        body: "some message 2",
      },
    });
  });

  it("should handle hideMessage", () => {
    expect(
      messagesReducer(
        {
          message1: {
            body: "some message",
          },
          message2: {
            body: "some message 2",
          },
        },
        {
          type: hideMessage.type,
          payload: "message2",
        }
      )
    ).toEqual({
      message1: {
        body: "some message",
      },
    });
  });
});

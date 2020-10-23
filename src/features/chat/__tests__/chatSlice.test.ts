import chatReducer, {
  getChatMessagesListRequest,
  getChatMessagesListSuccess,
  getChatMessagesListError,
} from "../chatSlice";

describe("chatSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      chatReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });
});

import acceptSeekRequestReducer from "../acceptSeekRequestSlice";
import {
  acceptSeekRequest,
  acceptSeekSuccess,
  acceptSeekError,
} from "../../challenge/challengeSlice";
import { defaultGameSample } from "../../../test-utils/data-sample/game";

describe("challengeSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      acceptSeekRequestReducer(undefined, {
        type: "",
      })
    ).toEqual({
      inProcess: false,
      itemId: null,
      error: null,
    });
  });

  it("should handle acceptSeekRequest", () => {
    expect(
      acceptSeekRequestReducer(
        {
          inProcess: false,
          itemId: 5,
          error: "error text",
        },
        {
          type: acceptSeekRequest.type,
          payload: 6,
        }
      )
    ).toEqual({
      inProcess: true,
      itemId: 6,
      error: null,
    });
  });

  it("should handle acceptSeekSuccess", () => {
    expect(
      acceptSeekRequestReducer(
        {
          inProcess: true,
          itemId: 5,
          error: null,
        },
        {
          type: acceptSeekSuccess.type,
          payload: {
            seekId: 5,
            normalizedGame: {
              result: 1,
              entities: {
                games: {
                  "1": defaultGameSample,
                },
              },
            },
          },
        }
      )
    ).toEqual({
      inProcess: false,
      itemId: null,
      error: null,
    });
  });

  it("should handle acceptSeekError", () => {
    expect(
      acceptSeekRequestReducer(
        {
          inProcess: true,
          itemId: 5,
          error: null,
        },
        {
          type: acceptSeekError.type,
          payload: {
            itemId: 5,
            error: "error text",
          },
        }
      )
    ).toEqual({
      inProcess: false,
      itemId: 5,
      error: "error text",
    });
  });
});

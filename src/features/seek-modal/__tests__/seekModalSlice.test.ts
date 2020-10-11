import seekModalReducer, {
  showSeekModal,
  hideSeekModal,
} from "../seekModalSlice";
import { createSeekSuccess } from "../../challenge/challengeSlice";

describe("seekModalSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      seekModalReducer(undefined, {
        type: "",
      })
    ).toEqual({ isSeekModalVisible: false });
  });

  it("should handle showSeekModal", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: false,
        },
        {
          type: showSeekModal.type,
        }
      )
    ).toEqual({
      isSeekModalVisible: true,
    });
  });

  it("should handle hideSeekModal", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: true,
        },
        {
          type: hideSeekModal.type,
        }
      )
    ).toEqual({
      isSeekModalVisible: false,
    });
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: true,
        },
        {
          type: createSeekSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      isSeekModalVisible: false,
    });
  });
});

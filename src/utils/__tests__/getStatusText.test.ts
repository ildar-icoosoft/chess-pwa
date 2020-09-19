import getStatusText from "../getStatusText";
import {
  blackOutOfTimeGameSample,
  gameSample,
  whiteOutOfTimeGameSample,
} from "../../test-utils/data-sample/game";

it("getStatusText", () => {
  expect(getStatusText(gameSample)).toBe("Playing right now");
  expect(getStatusText(whiteOutOfTimeGameSample)).toBe(
    "Time out • Black is victorious"
  );
  expect(getStatusText(blackOutOfTimeGameSample)).toBe(
    "Time out • White is victorious"
  );
});

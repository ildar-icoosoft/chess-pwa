import getGameStatusText from "../getGameStatusText";
import {
  blackOutOfTimeGameSample,
  gameSample,
  whiteOutOfTimeGameSample,
} from "../../test-utils/data-sample/game";

it("getGameStatusText", () => {
  expect(getGameStatusText(gameSample)).toBe("Playing right now");
  expect(getGameStatusText(whiteOutOfTimeGameSample)).toBe(
    "Time out • Black is victorious"
  );
  expect(getGameStatusText(blackOutOfTimeGameSample)).toBe(
    "Time out • White is victorious"
  );
});

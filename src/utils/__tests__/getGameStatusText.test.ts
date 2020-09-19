import getGameStatusText from "../getGameStatusText";
import {
  blackOutOfTimeGameSample,
  blackResignedGameSample,
  gameSample,
  whiteOutOfTimeGameSample,
  whiteResignedGameSample,
} from "../../test-utils/data-sample/game";

it("getGameStatusText", () => {
  expect(getGameStatusText(gameSample)).toBe("Playing right now");
  expect(getGameStatusText(whiteOutOfTimeGameSample)).toBe(
    "Time out • Black is victorious"
  );
  expect(getGameStatusText(blackOutOfTimeGameSample)).toBe(
    "Time out • White is victorious"
  );

  expect(getGameStatusText(blackResignedGameSample)).toBe(
    "Black resigned • White is victorious"
  );
  expect(getGameStatusText(whiteResignedGameSample)).toBe(
    "White resigned • Black is victorious"
  );
});

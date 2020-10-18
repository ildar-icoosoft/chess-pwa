import makeChessInstance from "../makeChessInstance";
import {
  gameSample1,
  gameSample1Fen,
  gameWithMovesRewoundToIndex3SampleFen,
  gameWithMovesSample,
  gameWithMovesSampleFen,
  makeGameSample,
} from "../../test-utils/data-sample/game";

describe("makeChessInstance", () => {
  it("startpos with empty moves prop", () => {
    expect(makeChessInstance(gameSample1).fen()).toBe(gameSample1Fen);
  });

  it("not empty moves", () => {
    expect(makeChessInstance(gameWithMovesSample).fen()).toBe(
      gameWithMovesSampleFen
    );
  });

  it("not empty moves and rewindToMoveIndex", () => {
    expect(makeChessInstance(gameWithMovesSample, 3).fen()).toBe(
      gameWithMovesRewoundToIndex3SampleFen
    );
  });

  it("throws error if move is incorrect", () => {
    const gameWithIncorrectMoveSample = makeGameSample({
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1",
      moves: "e2e4 e7e5", // e2e4 is incorrect
    });

    expect(() => makeChessInstance(gameWithIncorrectMoveSample)).toThrow(
      `incorrect move: e2e4`
    );
  });
});

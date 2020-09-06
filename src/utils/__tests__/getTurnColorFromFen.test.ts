import getTurnColorFromFen from "../getTurnColorFromFen";

it("getTurnColorFromFen", () => {
  expect(
    getTurnColorFromFen(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    )
  ).toBe("white");

  expect(
    getTurnColorFromFen(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1"
    )
  ).toBe("black");
});

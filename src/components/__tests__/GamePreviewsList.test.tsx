import GamePreviewsList from "../GamePreviewsList";
import mountTest from "../../tests/mountTest";

describe("OngoingGames", () => {
  mountTest(GamePreviewsList);

  // it("Snapshot", () => {
  //   const tree = TestRenderer.create(<Board/>).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  //
  // describe("children components", () => {
  //   it("contains 1 PieceDragLayer", () => {
  //     const testInstance = TestRenderer.create(<Board/>).root;
  //
  //     expect(testInstance.findAllByType(PieceDragLayer).length).toBe(1);
  //   });
  // });
});

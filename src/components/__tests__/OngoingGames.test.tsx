import { mountTest } from "../../tests/mountTest";
import OngoingGames from "../OngoingGames";

describe("OngoingGames", () => {
  mountTest(OngoingGames);

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

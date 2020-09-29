import { useDispatch, useSelector } from "react-redux";
import { stateWithDataSample } from "../../../test-utils/data-sample/state";
import React, { useEffect } from "react";
import mountTest from "../../../test-utils/mountTest";
import { SingleGameControlPanelContainer } from "../SingleGameControlPanelContainer";
import TestRenderer from "react-test-renderer";
import { GameControlPanel } from "../GameControlPanel";

describe("SingleGameControlPanelContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SingleGameControlPanelContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGame", async () => {
      const testRenderer = TestRenderer.create(
        <SingleGameControlPanelContainer id={2} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(0);

      testRenderer.update(<SingleGameControlPanelContainer id={1} />);

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(1);
    });
  });
});

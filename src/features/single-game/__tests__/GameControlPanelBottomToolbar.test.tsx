import { render, fireEvent } from "@testing-library/react";
import { GameMeta } from "../GameMeta";
import React from "react";
import { GameControlPanelBottomToolbar } from "../GameControlPanelBottomToolbar";

describe("GameMeta", () => {
  describe("Events", () => {
    it("onAbortGame", () => {
      const onAbortGame = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelBottomToolbar onAbortGame={onAbortGame} />
      );

      fireEvent.click(getByTestId("abort-game-btn"));

      expect(onAbortGame).toBeCalledTimes(1);
      expect(onAbortGame).toBeCalledWith();
    });
  });
});

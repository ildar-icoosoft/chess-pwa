import React from "react";
import { render } from "@testing-library/react";
import { defaultGameSample } from "../../../test-utils/data-sample/game";
import getGameStatusText from "../../../utils/getGameStatusText";
import { GameControlPanelStatus } from "../GameControlPanelStatus";

jest.mock("../../../utils/getGameStatusText");

describe("GameControlPanelStatus", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanelStatus />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain status", () => {
      (getGameStatusText as jest.Mock).mockReturnValue("some status text");

      const { queryByTestId } = render(
        <GameControlPanelStatus game={defaultGameSample} />
      );

      const gameStatus = queryByTestId("game-status");

      expect(gameStatus).toHaveTextContent("some status text");
    });
  });
});

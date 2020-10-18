import React from "react";
import { render } from "@testing-library/react";
import { gameSample2_ } from "../../../test-utils/data-sample/game";
import { GameControlPanelUserName } from "../GameControlPanelUserName";

describe("GameControlPanelUserName", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanelUserName />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player name", () => {
      const { container, rerender } = render(
        <GameControlPanelUserName game={gameSample2_} />
      );

      expect(container).toHaveTextContent("AI level 3");

      rerender(<GameControlPanelUserName game={gameSample2_} color="black" />);

      expect(container).toHaveTextContent("Thomas Miller");
    });
  });
});

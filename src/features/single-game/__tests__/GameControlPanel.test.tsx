import { render } from "@testing-library/react";
import React from "react";
import { GameControlPanel } from "../GameControlPanel";

describe("GameControlPanel", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanel />);
      expect(container).toBeEmpty();
    });
  });
});

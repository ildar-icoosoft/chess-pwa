import React from "react";
import { render } from "@testing-library/react";
import { GameMeta } from "../GameMeta";

describe("GameMeta", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameMeta />);
      expect(container).toBeEmpty();
    });
  });
});

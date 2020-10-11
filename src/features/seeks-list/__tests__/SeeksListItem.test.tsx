import mountTest from "../../../test-utils/mountTest";
import { render } from "@testing-library/react";
import React from "react";
import { SeeksListItem } from "../SeeksListItem";
import { GameMeta } from "../../single-game/GameMeta";
import { gameSample3 } from "../../../test-utils/data-sample/game";
import { defaultSeekSample } from "../../../test-utils/data-sample/seek";

describe("SeeksListItem", () => {
  mountTest(SeeksListItem);

  describe("DOM structure", () => {
    it("should contain nothing if no seek", () => {
      const { container } = render(<SeeksListItem />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player name", () => {
      const { getByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      expect(getByTestId("user-name")).toHaveTextContent("Thomas Miller");
    });
  });
});

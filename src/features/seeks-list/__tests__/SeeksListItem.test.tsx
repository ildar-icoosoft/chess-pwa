import mountTest from "../../../test-utils/mountTest";
import { render } from "@testing-library/react";
import React from "react";
import { SeeksListItem } from "../SeeksListItem";
import {
  defaultSeekSample,
  seekSample2,
} from "../../../test-utils/data-sample/seek";

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

    it("should contain time control", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      const timeControl = queryByTestId("time-control");

      expect(timeControl).toHaveTextContent("5 + 5");

      rerender(<SeeksListItem seek={seekSample2} />);

      expect(timeControl).toHaveTextContent("10 + 3");
    });

    it("should contain play button", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      expect(queryByTestId("play-btn-1")).toBeInTheDocument();

      render(<SeeksListItem seek={seekSample2} />);

      expect(queryByTestId("play-btn-2")).toBeInTheDocument();
    });
  });
});

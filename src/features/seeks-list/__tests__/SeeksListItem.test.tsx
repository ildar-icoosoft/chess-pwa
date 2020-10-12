import mountTest from "../../../test-utils/mountTest";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { SeeksListItem } from "../SeeksListItem";
import {
  defaultSeekSample,
  seekSample2,
} from "../../../test-utils/data-sample/seek";
import { ChallengeButtons } from "../../home-page/ChallengeButtons";

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
      const { queryByTestId } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      expect(queryByTestId("play-btn")).toBeInTheDocument();
    });

    it("should contain gameIsStarted class", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      const seekWrapper = queryByTestId("seek-wrapper");

      expect(seekWrapper).not.toHaveClass("gameIsStarted");

      rerender(<SeeksListItem seek={seekSample2} />);

      expect(seekWrapper).toHaveClass("gameIsStarted");
    });
  });

  describe("Events", () => {
    it("onPlay", () => {
      const onPlay = jest.fn();

      const { getByTestId } = render(
        <SeeksListItem seek={defaultSeekSample} onPlay={onPlay} />
      );

      fireEvent.click(getByTestId("play-btn"));

      expect(onPlay).toBeCalledTimes(1);
      expect(onPlay).toBeCalledWith(1);
    });
  });
});

import TestRenderer from "react-test-renderer";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { SeeksList } from "../SeeksList";
import {
  defaultSeekSample,
  seekSample2,
} from "../../../test-utils/data-sample/seek";
import { Seek } from "../../../interfaces/Seek";
import { SeeksListItem } from "../SeeksListItem";
import { SeekModal } from "../../seek-modal/SeekModal";
import { Modal } from "react-bootstrap";

const seeksList: Seek[] = [defaultSeekSample, seekSample2];

describe("SeeksList", () => {
  mountTest(SeeksList);

  describe("children components", () => {
    it("contains GamePreviewsList", () => {
      const testRenderer = TestRenderer.create(<SeeksList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeeksListItem).length).toBe(0);

      testRenderer.update(<SeeksList seeks={seeksList} />);
      expect(testInstance.findAllByType(SeeksListItem).length).toBe(2);
    });
  });

  describe("children components props", () => {
    describe("SeeksListItem", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <SeeksList seeks={seeksList} />
        );
        const testInstance = testRenderer.root;

        const seeksListItems = testInstance.findAllByType(SeeksListItem);

        expect(seeksListItems[0].props.seek).toBe(defaultSeekSample);
        expect(seeksListItems[1].props.seek).toBe(seekSample2);
      });

      it("onPlay", () => {
        const testRenderer = TestRenderer.create(
          <SeeksList seeks={seeksList} />
        );
        const testInstance = testRenderer.root;

        const seeksListItems = testInstance.findAllByType(SeeksListItem);

        expect(seeksListItems[0].props.onPlay).toBeUndefined();
        expect(seeksListItems[1].props.onPlay).toBeUndefined();

        const onPlay = jest.fn();

        testRenderer.update(<SeeksList seeks={seeksList} onPlay={onPlay} />);

        expect(seeksListItems[0].props.onPlay).toBe(onPlay);
        expect(seeksListItems[1].props.onPlay).toBe(onPlay);
      });
    });
  });
});

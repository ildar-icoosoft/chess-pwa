import React from "react";
import TestRenderer from "react-test-renderer";
import { MemoryRouter, Route } from "react-router-dom";
import GamePage from "../GamePage";
import { SingleGameMetaContainer } from "../SingleGameMetaContainer";
import { SingleGameControlPanelContainer } from "../SingleGameControlPanelContainer";
import { SingleGameBoardContainer } from "../SingleGameBoardContainer";

describe("GamePage", () => {
  describe("children components", () => {
    it("contains SingleGameMetaContainer", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGameMetaContainer).length).toBe(
        1
      );
    });

    it("contains SingleGameControlPanelContainer", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(
        testInstance.findAllByType(SingleGameControlPanelContainer).length
      ).toBe(1);
    });

    it("contains SingleGameBoardContainer", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGameBoardContainer).length).toBe(
        1
      );
    });
  });

  describe("children components props", () => {
    describe("singleGameMetaContainer", () => {
      it("id", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const singleGameMetaContainer = testInstance.findByType(
          SingleGameMetaContainer
        );

        expect(singleGameMetaContainer.props.id).toBe(2);
      });
    });

    describe("SingleGameControlPanelContainer", () => {
      it("id", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelContainer = testInstance.findByType(
          SingleGameControlPanelContainer
        );

        expect(singleGameControlPanelContainer.props.id).toBe(2);
      });
    });

    describe("SingleGameBoardContainer", () => {
      it("id", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const singleGameBoardContainer = testInstance.findByType(
          SingleGameBoardContainer
        );

        expect(singleGameBoardContainer.props.id).toBe(2);
      });
    });
  });
});

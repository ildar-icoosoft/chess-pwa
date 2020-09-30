import React, { useEffect } from "react";
import TestRenderer from "react-test-renderer";
import { MemoryRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GamePage from "../GamePage";
import { SingleGameMetaContainer } from "../SingleGameMetaContainer";
import { SingleGameControlPanelContainer } from "../SingleGameControlPanelContainer";
import { SingleGameBoardContainer } from "../SingleGameBoardContainer";
import { fetchGame } from "../singleGameSlice";
import { stateWithDataSample } from "../../../test-utils/data-sample/state";

jest.mock("../singleGameSlice");

describe("GamePage", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

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

  describe("dispatch() calls", () => {
    it("should call dispatch(fetchGame())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchGameReturnedValue = Symbol("fetchGame");

      const fetchGameFn = fetchGame as jest.Mock;
      fetchGameFn.mockClear();
      fetchGameFn.mockReturnValue(fetchGameReturnedValue);

      TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);

      // @todo. fix the commented code
      /*
      fetchGameFn.mockClear();
      dispatch.mockClear();
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      testRenderer.update(
        <MemoryRouter initialEntries={["/game/2"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(2);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);
      */
    });
  });
});

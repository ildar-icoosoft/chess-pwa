import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OngoingGamesContainer from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../../test-utils/mountTest";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import {
  gameSample1,
  makeGameSample,
} from "../../../test-utils/data-sample/game";
import userSample1 from "../../../test-utils/data-sample/user";
import NormalizedGameEntity from "../../../normalizr/interfaces/NormalizedGameEntity";

const stateWithLoadingGames = makeStateSample({
  gamesList: {
    isLoading: true,
    error: null,
  },
});

const stateWithLoadingError = makeStateSample({
  gamesList: {
    isLoading: false,
    error: "error text",
  },
});

const game1 = gameSample1;
const game2 = makeGameSample(
  {
    id: 2,
    status: "outoftime",
    winner: "white",
  },
  gameSample1
);
const game3 = makeGameSample(
  {
    id: 3,
    status: "aborted",
  },
  gameSample1
);
const game4 = makeGameSample(
  {
    id: 4,
    createdAt: 1,
  },
  gameSample1
);
const game5 = makeGameSample(
  {
    id: 5,
    createdAt: 1,
    status: "resign",
    winner: "white",
  },
  gameSample1
);

const stateWithGames = makeStateSample({
  entities: {
    users: {
      "1": userSample1,
    },
    games: {
      "1": game1 as NormalizedGameEntity,
      "2": game2 as NormalizedGameEntity,
      "3": game3 as NormalizedGameEntity,
      "4": game4 as NormalizedGameEntity,
      "5": game5 as NormalizedGameEntity,
    },
    seeks: {},
  },
});

describe("OngoingGamesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", async () => {
      const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      it("games", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.games).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithGames)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.games).toEqual([game4, game1]);
      });

      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.isLoading).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingGames)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.isLoading).toBeTruthy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.error).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingError)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.error).toBe("error text");
      });

      it("emptyContentMessage", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.emptyContentMessage).toBe(
          "Nobody is playing right now"
        );
      });
    });
  });
});

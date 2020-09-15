import React from "react";
import TestRenderer from "react-test-renderer";
import { useSelector } from "react-redux";
import mountTest from "../../test-utils/mountTest";
import HomePage from "../HomePage";
import OngoingGamesContainer from "../../containers/OngoingGamesContainer";
import { RootState } from "../../app/rootReducer";

const stateSample: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
  },
  ongoingGames: {
    items: [],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {},
    games: {},
  },
};

describe("HomePage", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(stateSample));
  });

  mountTest(HomePage);

  it("Snapshot", () => {
    const tree = TestRenderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("children components", () => {
    it("contains OngoingGamesContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(OngoingGamesContainer).length).toBe(1);
    });
  });
});

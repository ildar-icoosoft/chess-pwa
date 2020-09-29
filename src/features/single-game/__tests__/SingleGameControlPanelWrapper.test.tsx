import TestRenderer from "react-test-renderer";
import {
  defaultGameSample,
  gameSample2,
  gameSample3,
  gameThatCanBeAbortedSample,
  gameWithMovesAndUserSample,
  gameWithMovesAndUserVsUserSample,
  gameWithMovesSample,
  makeGameSample,
} from "../../../test-utils/data-sample/game";
import React from "react";
import { GameControlPanel } from "../GameControlPanel";
import { SingleGameControlPanelWrapper } from "../SingleGameControlPanelWrapper";
import { SingleGame } from "../SingleGame";
import userSample from "../../../test-utils/data-sample/user";

describe("SingleGameControlPanelWrapper", () => {
  describe("children components", () => {
    it("contains GameControlPanel", () => {
      const testRenderer = TestRenderer.create(
        <SingleGameControlPanelWrapper />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(0);

      testRenderer.update(
        <SingleGameControlPanelWrapper game={defaultGameSample} />
      );

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GameControlPanel", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameControlPanelWrapper game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameControlPanel);

        expect(gameMeta.props.game).toBe(defaultGameSample);
      });

      it("orientation", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameControlPanelWrapper game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.orientation).toBe("white");

        testRenderer.update(
          <SingleGameControlPanelWrapper
            game={gameSample2}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.orientation).toBe("black");

        testRenderer.update(
          <SingleGameControlPanelWrapper
            game={gameSample2}
            currentUser={userSample}
            isFlipped
          />
        );

        expect(gameControlPanel.props.orientation).toBe("white");
      });

      it("rewindToMoveIndex", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameControlPanelWrapper game={gameWithMovesSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.rewindToMoveIndex).toBeNull();

        testRenderer.update(
          <SingleGameControlPanelWrapper
            game={gameWithMovesSample}
            rewindToMoveIndex={2}
          />
        );

        expect(gameControlPanel.props.rewindToMoveIndex).toBe(2);

        testRenderer.update(
          <SingleGameControlPanelWrapper
            game={gameWithMovesSample}
            rewindToMoveIndex={0}
          />
        );

        expect(gameControlPanel.props.rewindToMoveIndex).toBe(0);
      });

      it("drawOfferSentByCurrentUser", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameControlPanelWrapper game={gameSample3} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.drawOfferSentByCurrentUser).toBeFalsy();

        const gameWithdrawOfferSentByCurrentUser = makeGameSample(
          {
            drawOffer: "white",
          },
          gameSample3
        );

        testRenderer.update(
          <SingleGameControlPanelWrapper
            game={gameWithdrawOfferSentByCurrentUser}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.drawOfferSentByCurrentUser).toBeTruthy();
      });

      /*
      it("drawOfferSentByOpponent", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample3} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.drawOfferSentByOpponent).toBeFalsy();

        const gameWithdrawOfferSentByOpponent = makeGameSample(
          {
            drawOffer: "black",
          },
          gameSample3
        );

        testRenderer.update(
          <SingleGame
            game={gameWithdrawOfferSentByOpponent}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.drawOfferSentByOpponent).toBeTruthy();
      });

      it("canAbortGame", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameWithMovesSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.canAbortGame).toBeFalsy();

        testRenderer.update(
          <SingleGame
            game={gameThatCanBeAbortedSample}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canAbortGame).toBeTruthy();

        const gameSampleWithOutOfTimeStatus = makeGameSample(
          {
            status: "outoftime",
            winner: "white",
          },
          gameThatCanBeAbortedSample
        );

        testRenderer.update(
          <SingleGame
            game={gameSampleWithOutOfTimeStatus}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canAbortGame).toBeFalsy();
      });

      it("canResignGame", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameThatCanBeAbortedSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.canResignGame).toBeFalsy();

        testRenderer.update(
          <SingleGame
            game={gameWithMovesAndUserSample}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canResignGame).toBeTruthy();

        const gameSampleWithOutOfTimeStatus = makeGameSample(
          {
            status: "outoftime",
            winner: "white",
          },
          gameWithMovesAndUserSample
        );

        testRenderer.update(
          <SingleGame
            game={gameSampleWithOutOfTimeStatus}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canResignGame).toBeFalsy();
      });

      it("canOfferDraw", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameWithMovesAndUserVsUserSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        // not authenticated
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();

        testRenderer.update(
          <SingleGame
            game={gameWithMovesAndUserVsUserSample}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canOfferDraw).toBeTruthy();

        const gameWithOutOfTimeStatus = makeGameSample(
          {
            status: "outoftime",
            winner: "white",
          },
          gameWithMovesAndUserVsUserSample
        );

        testRenderer.update(
          <SingleGame game={gameWithOutOfTimeStatus} currentUser={userSample} />
        );

        // out of time
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();

        const gameWithDrawOffer = makeGameSample(
          {
            drawOffer: "white",
          },
          gameWithMovesAndUserVsUserSample
        );

        testRenderer.update(
          <SingleGame game={gameWithDrawOffer} currentUser={userSample} />
        );

        // draw is already offered
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();

        const gameVsAI = makeGameSample(
          {
            aiLevel: 2,
            black: null,
          },
          gameWithMovesAndUserVsUserSample
        );

        testRenderer.update(
          <SingleGame game={gameVsAI} currentUser={userSample} />
        );

        // game VS AI
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();
      });

      it("onFlipBoard", () => {
        const onFlipBoard = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onFlipBoard={onFlipBoard} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onFlipBoard).toBe(onFlipBoard);
      });

      it("onAcceptDrawOffer", () => {
        const onAcceptDrawOffer = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame
            game={defaultGameSample}
            onAcceptDrawOffer={onAcceptDrawOffer}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onAcceptDrawOffer).toBe(
          onAcceptDrawOffer
        );
      });

      it("onDeclineDrawOffer", () => {
        const onDeclineDrawOffer = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame
            game={defaultGameSample}
            onDeclineDrawOffer={onDeclineDrawOffer}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onDeclineDrawOffer).toBe(
          onDeclineDrawOffer
        );
      });

      it("onAbortGame", () => {
        const onAbortGame = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onAbortGame={onAbortGame} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onAbortGame).toBe(onAbortGame);
      });

      it("onOfferDraw", () => {
        const onOfferDraw = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onOfferDraw={onOfferDraw} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onOfferDraw).toBe(onOfferDraw);
      });

      it("onResignGame", () => {
        const onResignGame = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onResignGame={onResignGame} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onResignGame).toBe(onResignGame);
      });*/
    });
  });
});

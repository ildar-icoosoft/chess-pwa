/* eslint-disable @typescript-eslint/no-explicit-any */

import entitiesReducer, { EntitiesState } from "../entitiesSlice";
import { getGamesListSuccess } from "../../games-list/gamesListSlice";
import { getSeeksListSuccess } from "../../seeks-list/seeksListSlice";
import {
  abortGameSuccess,
  getSingleGameSuccess,
  resignGameSuccess,
  offerDrawSuccess,
  acceptDrawOfferSuccess,
  declineDrawOfferSuccess,
} from "../../single-game/singleGameSlice";
import {
  challengeAiSuccess,
  createSeekSuccess,
  acceptSeekSuccess,
} from "../../challenge/challengeSlice";
import { oneSecondPassed } from "../../game-clock/gameClockSlice";
import { makeMoveRequest, makeMoveSuccess } from "../../move/moveSlice";
import {
  getCurrentUserSuccess,
  loginSuccess,
  registerSuccess,
} from "../../current-user/currentUserSlice";
import {
  createGameBySubscription,
  updateGameBySubscription,
  createSeekBySubscription,
  updateSeekBySubscription,
  removeSeekBySubscription,
} from "../../data-subscription/dataSubscriptionSlice";
import {
  emptyEntities,
  entitiesSample_,
  entitiesAfterAddingGameSample,
  entitiesAfterMoveSample,
  entitiesAfterTimeOutSample,
  entitiesBeforeTimeOutSample,
  entitiesAfterTwoMovesSample,
  entitiesAfterTwoMovesAndOneSecondSample,
  entitiesAfterAddingSeekSample,
  addSeekPayloadSample,
  makeEntitiesSample,
  addGamePayloadSample,
} from "../../../test-utils/data-sample/entities";
import {
  normalizedUserSample1,
  normalizedUserSample2,
  userSample1,
} from "../../../test-utils/data-sample/user";
import {
  normalizedSeekSample1,
  normalizedSeekSample2,
} from "../../../test-utils/data-sample/seek";
import {
  normalizedGameSample1,
  normalizedGameSample2,
} from "../../../test-utils/data-sample/game";

jest.mock("../../../services/ioClient");

const entitiesSample = makeEntitiesSample({
  users: {
    1: normalizedUserSample1,
  },
  seeks: {
    1: normalizedSeekSample1,
  },
  games: {
    1: normalizedGameSample1,
  },
});

const entitiesPayloadSample = makeEntitiesSample({
  users: {
    2: normalizedUserSample2,
  },
  seeks: {
    2: normalizedSeekSample2,
  },
  games: {
    2: normalizedGameSample2,
  },
});

const allEntitiesSample = makeEntitiesSample({
  users: {
    1: normalizedUserSample1,
    2: normalizedUserSample2,
  },
  seeks: {
    1: normalizedSeekSample1,
    2: normalizedSeekSample2,
  },
  games: {
    1: normalizedGameSample1,
    2: normalizedGameSample2,
  },
});

describe("entitiesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      entitiesReducer(undefined, {
        type: "",
      })
    ).toEqual(emptyEntities);
  });

  it("should handle getCurrentUserSuccess null", () => {
    expect(
      entitiesReducer(emptyEntities, {
        type: getCurrentUserSuccess.type,
        payload: null,
      })
    ).toEqual(emptyEntities);
  });

  it("should handle getCurrentUserSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getCurrentUserSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle loginSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: loginSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle registerSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: registerSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle updateGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: updateGameBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle createGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createGameBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle makeMoveRequest", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: makeMoveRequest.type,
        payload: {
          gameId: 1,
          move: "e2e4",
        },
      })
    ).toEqual({
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "black",
          moves: "e2e4",
        },
      },
    });
  });

  it("should handle makeMoveSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: makeMoveSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle getGamesListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getGamesListSuccess.type,
        payload: {
          result: [2],
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle oneSecondPassed", () => {
    // do not change time because there is no moves
    expect(
      entitiesReducer(entitiesSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesSample);

    // do not change time because there is only one move (time starts to go after two moves)
    expect(
      entitiesReducer(entitiesAfterMoveSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesAfterMoveSample);

    // do not change time because there is only one move (time starts to go after two moves)
    expect(
      entitiesReducer(entitiesAfterTwoMovesSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesAfterTwoMovesAndOneSecondSample);

    expect(
      entitiesReducer(entitiesBeforeTimeOutSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesAfterTimeOutSample);
  });

  it("should handle getSingleGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: getSingleGameSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle abortGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: abortGameSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle resignGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: resignGameSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle offerDrawSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: offerDrawSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle acceptDrawOfferSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: acceptDrawOfferSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle declineDrawOfferSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: declineDrawOfferSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: challengeAiSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("createSeekSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: createSeekSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle getSeeksListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: getSeeksListSuccess.type,
        payload: {
          result: [1],
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle acceptSeekSuccess", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: acceptSeekSuccess.type,
        payload: {
          result: 2,
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle createSeekBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: createSeekBySubscription.type,
        payload: {
          result: 2,
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle updateSeekBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample_, {
        type: updateSeekBySubscription.type,
        payload: {
          result: 2,
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle removeSeekBySubscription", () => {
    const entitiesWithSeeksSample: EntitiesState = {
      users: {},
      games: {},
      seeks: {
        1: {
          id: 1,
          color: "white",
          clockLimit: 300,
          createdAt: 0,
          clockIncrement: 5,
          createdBy: 2,
          game: 2,
        },
        2: {
          id: 2,
          color: "white",
          clockLimit: 400,
          createdAt: 0,
          clockIncrement: 5,
          createdBy: 2,
          game: 3,
        },
      },
    };

    expect(
      entitiesReducer(entitiesWithSeeksSample, {
        type: removeSeekBySubscription.type,
        payload: 1,
      })
    ).toEqual({
      users: {},
      games: {},
      seeks: {
        2: {
          id: 2,
          color: "white",
          clockLimit: 400,
          createdAt: 0,
          clockIncrement: 5,
          createdBy: 2,
          game: 3,
        },
      },
    });
  });
});

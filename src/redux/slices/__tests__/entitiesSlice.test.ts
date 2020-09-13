import entitiesReducer, {
  EntitiesState,
  updateGameSuccess,
  createGameSuccess,
  makeMoveSuccess,
  makeMoveRequest,
  makeMoveError,
} from "../entitiesSlice";
import { getOngoingGamesSuccess } from "../ongoingGamesSlice";
import { getSingleGameSuccess } from "../singleGameSlice";

const entitiesBefore: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
  },
};

const payloadEntities: EntitiesState = {
  users: {
    2: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    2: {
      id: 2,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
  },
};

const entitiesAfter: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
    2: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
    2: {
      id: 2,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
  },
};

describe("entitiesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      entitiesReducer(undefined, {
        type: "",
      })
    ).toEqual({
      users: {},
      games: {},
    });
  });

  it("should handle updateGameSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: updateGameSuccess.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle createGameSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: createGameSuccess.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle makeMoveSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: makeMoveSuccess.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle getOngoingGamesSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: getOngoingGamesSuccess.type,
        payload: {
          result: [2],
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle getSingleGameSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: getSingleGameSuccess.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle makeMoveRequest", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: makeMoveRequest.type,
      })
    ).toEqual(entitiesBefore);
  });

  it("should handle makeMoveError", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: makeMoveError.type,
        payload: "error text",
      })
    ).toEqual(entitiesBefore);
  });
});

import usersListReducer, {
  getUsersListRequest,
  getUsersListSuccess,
  getUsersListError,
} from "../usersListSlice";
import {
  createUserBySubscription,
  updateUserBySubscription,
} from "../../data-subscription/dataSubscriptionSlice";

describe("usersListSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      usersListReducer(undefined, {
        type: "",
      })
    ).toEqual({
      isLoading: true,
      error: null,
      items: [],
    });
  });

  it("should handle getUsersListRequest", () => {
    expect(
      usersListReducer(
        {
          isLoading: false,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getUsersListRequest.type,
        }
      )
    ).toEqual({
      isLoading: true,
      error: null,
      items: [1, 2],
    });
  });

  it("should handle getUsersListSuccess", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getUsersListSuccess.type,
          payload: {
            result: [2, 3],
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: false,
      error: null,
      items: [2, 3],
    });
  });

  it("should handle getUsersListError", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: null,
          items: [1, 2],
        },
        {
          type: getUsersListError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      isLoading: false,
      error: "error text",
      items: [],
    });
  });

  it("should handle createUserBySubscription", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: createUserBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2],
    });

    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: createUserBySubscription.type,
          payload: {
            result: 3,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2, 3],
    });
  });

  it("should handle updateUserBySubscription", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: updateUserBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2],
    });

    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: updateUserBySubscription.type,
          payload: {
            result: 3,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2, 3],
    });
  });
});

import currentUserReducer, {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../currentUserSlice";

describe("currentUserSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      currentUserReducer(undefined, {
        type: "",
      })
    ).toEqual({ error: null, isLoading: true, userId: null });
  });

  it("should handle getCurrentUserRequest", () => {
    expect(
      currentUserReducer(
        {
          userId: null,
          isLoading: false,
          error: "error text",
        },
        {
          type: getCurrentUserRequest.type,
        }
      )
    ).toEqual({
      userId: null,
      isLoading: true,
      error: null,
    });
  });

  it("should handle getCurrentUserSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: "error text",
        },
        {
          type: getCurrentUserSuccess.type,
          payload: null,
        }
      )
    ).toEqual({
      userId: null,
      isLoading: false,
      error: null,
    });

    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: "error text",
        },
        {
          type: getCurrentUserSuccess.type,
          payload: {
            result: 3,
            entities: {},
          },
        }
      )
    ).toEqual({
      userId: 3,
      isLoading: false,
      error: null,
    });
  });

  it("should handle getCurrentUserError", () => {
    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: null,
        },
        {
          type: getCurrentUserError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      userId: 2,
      isLoading: false,
      error: "error text",
    });
  });

  it("should handle loginSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: null,
          isLoading: true,
          error: "error text",
        },
        {
          type: loginSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle registerSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: null,
          isLoading: true,
          error: "error text",
        },
        {
          type: registerSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle logoutSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: "error text",
        },
        {
          type: logoutSuccess.type,
        }
      )
    ).toEqual({
      userId: null,
      isLoading: true,
      error: "error text",
    });
  });
});

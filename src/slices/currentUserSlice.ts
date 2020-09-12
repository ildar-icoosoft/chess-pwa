import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import ioClient from "../services/ioClient";
import { JWR } from "sails.io.js";
import User from "../interfaces/User";
import LoginData from "../interfaces/LoginData";
import SignUpData from "../interfaces/SignUpData";

interface CurrentUserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrentUserState = {
  currentUser: null,
  isLoading: true,
  error: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    getCurrentUserRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getCurrentUserSuccess(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getCurrentUserError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    logoutSuccess(state) {
      state.currentUser = null;
    },
  },
});

export const {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;

export const fetchCurrentUser = (): AppThunk<void> => (dispatch) => {
  dispatch(getCurrentUserRequest());

  ioClient.socket.get("/api/v1/account/me", (body: unknown, jwr: JWR) => {
    if (jwr.statusCode === 200) {
      dispatch(getCurrentUserSuccess(body as User));
    } else if (jwr.statusCode === 401) {
      dispatch(getCurrentUserSuccess(null));
    } else {
      dispatch(getCurrentUserError(jwr.body));
    }
  });
};

export const login = (data: LoginData): AppThunk<Promise<User>> => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    ioClient.socket.put(
      "/api/v1/entrance/login",
      {
        rememberMe: true,
        emailAddress: data.email,
        password: data.password,
      },
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          dispatch(loginSuccess(body as User));
          resolve(body as User);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const register = (data: SignUpData): AppThunk<Promise<User>> => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      "/api/v1/entrance/signup",
      {
        fullName: data.fullName,
        emailAddress: data.email,
        password: data.password,
        confirmPassword: data.password,
        agreed: true,
      },
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          dispatch(registerSuccess(body as User));
          resolve(body as User);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const logout = (): AppThunk<Promise<void>> => (dispatch) => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      "/api/v1/account/logout",
      {},
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          dispatch(logoutSuccess());
          resolve();
        } else {
          reject(jwr);
        }
      }
    );
  });
};

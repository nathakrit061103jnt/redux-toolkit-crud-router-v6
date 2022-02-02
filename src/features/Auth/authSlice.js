import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  AUTH_REDUCER,
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_RE_SIGN_IN,
  NOK,
  OK,
  AUTH_SIGN_IN_STATUS,
  TOKEN_KEY,
  EMAIL_KEY,
} from "../../Constants";

import AuthDataService from "../../services/AuthService";
import { setCookie, removeCookie, getCookie } from "../../utils/cookie";

const initialState = {
  u_email: null,
  token: null,
  isSignIn: false,
};

export const signIn = createAsyncThunk(AUTH_SIGN_IN, async (payload) => {
  try {
    const { data } = await AuthDataService.authSingIn(payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const signUp = createAsyncThunk(AUTH_SIGN_UP, async (payload) => {
  try {
    const { data } = await AuthDataService.authSingUp(payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const signOut = createAction(AUTH_SIGN_OUT);
export const reSignIn = createAction(AUTH_RE_SIGN_IN);

const authSlice = createSlice({
  name: AUTH_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        const { token, u_email } = action.payload;
        setCookie(TOKEN_KEY, token);
        setCookie(EMAIL_KEY, u_email);
        setCookie(AUTH_SIGN_IN_STATUS, OK);
        state.u_email = u_email;
        state.token = token;
        state.isSignIn = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSignIn = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSignIn = false;
      })
      .addCase(signOut, (state, action) => {
        state.u_email = null;
        state.token = null;
        state.isSignIn = false;
        removeCookie(TOKEN_KEY);
        removeCookie(EMAIL_KEY);
        setCookie(AUTH_SIGN_IN_STATUS, NOK);
      })
      .addCase(reSignIn, (state, action) => {
        const signInStatus = getCookie(AUTH_SIGN_IN_STATUS);
        if (signInStatus && signInStatus === "ok") {
          const token = getCookie(TOKEN_KEY);
          const u_email = getCookie(EMAIL_KEY);
          state.u_email = u_email;
          state.token = token;
          state.isSignIn = true;
        }
      });
  },
});

const { reducer } = authSlice;
export default reducer;

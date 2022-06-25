import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    isLoggedIn: false,
    user: {},
    message: {},
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.auth.isLoggedIn = true;
      state.auth.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    authenticate: (state, { payload }) => {
      state.auth.user = payload;
      state.auth.isLoggedIn = true;
    },
  },
});

export const { loginUser, authenticate } = authSlice.actions;
export default authSlice.reducer;

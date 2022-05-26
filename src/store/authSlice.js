import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: { email: null, id: null, token: null },
  },
  reducers: {
    logIn(state, action) {
      state.userInfo = action.payload;
    },
    logOut(state, action) {
      state.userInfo = {};
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;

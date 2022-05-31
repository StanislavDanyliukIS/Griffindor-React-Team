import { createSlice } from "@reduxjs/toolkit";

const statusSlicer = createSlice({
  name: "status",
  initialState: {
    userStatus: null,
  },
  reducers: {
    logined(state, action) {
      state.userStatus = action.payload;
    },
    unlogined(state, action) {
      state.userStatus = action.payload;
    },
  },
});

export const { logined, unlogined } = statusSlicer.actions;

export default statusSlicer.reducer;

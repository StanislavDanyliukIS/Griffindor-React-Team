import { createSlice } from "@reduxjs/toolkit";

const userDataSlicer = createSlice({
  name: "data",
  initialState: { userData: {} },
  reducers: {
    addUserData(state, action) {
      state.userData = action.payload;
    },
    clearUserData(state, action) {
      state.userData = {};
    },
  },
});

export const { addUserData, clearUserData } = userDataSlicer.actions;

export default userDataSlicer.reducer;

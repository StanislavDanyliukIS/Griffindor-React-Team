import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
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

export const { addUserData, clearUserData } = userDataSlice.actions;

export default userDataSlice.reducer;

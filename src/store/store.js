import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import userDataSlicer from "./userDataSlicer";

export default configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    auth: authReducer,
    data: userDataSlicer,
  },
});

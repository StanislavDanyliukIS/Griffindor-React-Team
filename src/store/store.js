import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import userDataSlice from './userDataSlice';
import eventsSlice from './eventsSlice';
import crudReducer from "./crudSlice";
import statusSlicer from "./statusSlicer";

export default configureStore({
	reducer: {
		theme: themeReducer,
		user: userReducer,
		auth: authReducer,
		data: userDataSlice,
		events: eventsSlice,
		crud: crudReducer,
    status: statusSlicer,
	},

});

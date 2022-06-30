import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import userDataSlice from './slices/userDataSlice';
import eventsSlice from './slices/eventsSlice';
import statusSlicer from './slices/statusSlicer';

const reducers = combineReducers({
	theme: themeReducer,
	user: userReducer,
	auth: authReducer,
	data: userDataSlice,
	events: eventsSlice,
	status: statusSlicer,
});

export default configureStore({
	reducer: reducers,
});

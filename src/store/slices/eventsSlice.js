import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
	name: 'data',
	initialState: { eventsData: [] },
	reducers: {
		setEventsData(state, action) {
			state.eventsData = action.payload;
		},
	},
});

export const { setEventsData } = eventsSlice.actions;

export default eventsSlice.reducer;

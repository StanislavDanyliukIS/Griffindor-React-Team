import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => {
	const theme = `${window?.sessionStorage?.getItem('theme')}`;
	if (['light', 'dark'].includes(theme)) return theme;

	return 'light';
};

const initialState = getTheme();

const themeSlice = createSlice({
	name: 'theme',
	initialState,

	reducers: {
		toggleTheme: (state, action) => action.payload,
	},
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

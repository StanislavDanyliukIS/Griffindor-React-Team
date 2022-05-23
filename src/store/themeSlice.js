import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		theme: {
			isDark: false,
			colors: {
				primary: '#ffffff',
				secondary: '#f8f9fa',
				text: '#212529',
				subText: '#575a5e',
			},
		},
	},
	reducers: {
		toggleTheme: state => {
			state.theme.isDark = !state.theme.isDark;
			state.theme.colors = state.theme.isDark
				? {
						primary: '#1e293b',
						secondary: '#1b2434',
						text: '#ffffff',
						subText: '#626976',
				  }
				: {
						primary: '#ffffff',
						secondary: '#f8f9fa',
						text: '#212529',
						subText: '#575a5e',
				  };
		},
	},
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

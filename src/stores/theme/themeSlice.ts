import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  currentTheme: ThemeMode;
}

const initialState: ThemeState = {
  currentTheme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => ({
      ...state,
      currentTheme: state.currentTheme === 'light' ? 'dark' : 'light',
    }),
    setTheme: (state: ThemeState, action: PayloadAction<ThemeMode>) => ({
      ...state,
      currentTheme: action.payload,
    }),
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectCurrentTheme = (state: { theme: ThemeState }): ThemeMode =>
  state.theme.currentTheme;

export default themeSlice.reducer;

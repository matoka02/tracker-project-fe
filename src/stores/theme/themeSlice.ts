import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  currentTheme: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  }
  return 'light';
};

const initialState: ThemeState = {
  currentTheme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      const newTheme: ThemeMode = state.currentTheme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return {
        ...state,
        currentTheme: newTheme,
      };
    },
    setTheme: (state: ThemeState, action: PayloadAction<ThemeMode>) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
      }
      return {
        ...state,
        currentTheme: action.payload,
      };
    },
  },
});

export const selectCurrentTheme = (state: { theme: ThemeState }) => state.theme.currentTheme;

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;

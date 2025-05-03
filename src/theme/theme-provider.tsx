import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';
import React, { useEffect } from 'react';

import { useAppSelector } from '@/stores/hooks';
import { selectCurrentTheme } from '@/stores/theme/themeSlice';

import { createTheme2 } from './create-theme';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  baseTheme?: Theme;
};

function ThemeProvider({ children, baseTheme }: Props) {
  // const theme = createTheme2();

  // return (
  //   <MuiThemeProvider theme={theme}>
  //     <CssBaseline />
  //     {children}
  //   </MuiThemeProvider>
  // );
  const currentTheme = useAppSelector(selectCurrentTheme);
  const theme = createTheme2({ baseTheme, mode: currentTheme });

  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

ThemeProvider.defaultProps = {
  baseTheme: undefined,
};

export default ThemeProvider;

import { DarkMode as MoonIcon, LightMode as SunIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectCurrentTheme, toggleTheme } from '@/stores/theme/themeSlice';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: '8px',
  color: theme.palette.text.primary,
  transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '@media (min-width: 375px)': {
    marginRight: '14px',
  },
}));

function ThemeToggler(): React.ReactElement {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectCurrentTheme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <StyledIconButton onClick={handleThemeToggle} aria-label="Toggle theme" size="large">
      {currentTheme === 'light' ? (
        <MoonIcon
          sx={{
            width: 24,
            height: 24,
            '@media (min-width: 768px)': {
              width: 32,
              height: 32,
            },
          }}
        />
      ) : (
        <SunIcon
          sx={{
            width: 24,
            height: 24,
            '@media (min-width: 768px)': {
              width: 32,
              height: 32,
            },
          }}
        />
      )}
    </StyledIconButton>
  );
}

export default ThemeToggler;

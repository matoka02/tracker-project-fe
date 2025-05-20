import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import PeriodPaginator from './PeriodPaginator';
import PeriodTypeSelect from './PeriodTypeSelect';

// ----------------------------------------------------------------------

const PeriodWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingBottom: '24px',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

function CalendarToolBar(): React.ReactElement {
  return (
    <PeriodWrapper>
      <PeriodPaginator />
      <PeriodTypeSelect />
    </PeriodWrapper>
  );
}

export default CalendarToolBar;

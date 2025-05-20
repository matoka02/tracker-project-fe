import { Button, ButtonGroup, styled } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { selectActiveDate, selectPeriodType } from '@/stores/date/dateSelectors';
import { setPeriodType } from '@/stores/date/dateSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

// ----------------------------------------------------------------------

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  marginBottom: '24px',
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: '1px solid rgba(62, 133, 143, 0.2)',
  },
  '& .MuiButtonGroup-grouped:not(:first-of-type)': {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: '1px solid rgba(62, 133, 143, 0.2)',
  },
}));

const PeriodToggleButton = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
  width: '76px',
  height: '34px',
  backgroundColor: active
    ? theme.palette.variable.activeCalendarLinkColor
    : theme.palette.variable.inactiveCalendarLinkColor,
  color: active ? theme.palette.variable.activeTextColorBtn : '#3e85f3',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: 'calc(14 / 18)',
  borderColor: 'rgba(62, 133, 143, 0.2)',
}));

// ----------------------------------------------------------------------

function PeriodTypeSelect(): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const periodType = useAppSelector(selectPeriodType);
  const currentDate = useAppSelector(selectActiveDate);

  const handleTogglePeriod = (type: 'day' | 'month') => {
    dispatch(setPeriodType(type));
    router.push(`/calendar/${type}/${currentDate}`);
  };

  return (
    <StyledButtonGroup variant="contained" disableElevation>
      <PeriodToggleButton
        active={periodType === 'month'}
        onClick={() => handleTogglePeriod('month')}
      >
        Month
      </PeriodToggleButton>
      <PeriodToggleButton active={periodType === 'day'} onClick={() => handleTogglePeriod('day')}>
        Day
      </PeriodToggleButton>
    </StyledButtonGroup>
  );
}

export default PeriodTypeSelect;

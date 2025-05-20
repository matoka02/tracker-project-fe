import { Box, styled } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CalendarToolBar from '@/components/calendar/CalendarToolbar';
import { selectActiveDate, selectPeriodType } from '@/stores/date/dateSelectors';
import { setActiveDate, setPeriodType, setSelectedDate } from '@/stores/date/dateSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

// ----------------------------------------------------------------------

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: '0 20px 95px 20px',
  [theme.breakpoints.up('md')]: {
    padding: '0 32px 64px 32px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 32px 32px 32px',
  },
}));

// ----------------------------------------------------------------------

export default function CalendarPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const today = useAppSelector(selectActiveDate);
  const periodType = useAppSelector(selectPeriodType);

  // Get parameters from Next.js router
  const { date: dateParam } = router.query;
  const currentDate = Array.isArray(dateParam) ? dateParam[0] : dateParam || '';
  const paramsPeriod = currentDate.split('/')[0];

  useEffect(() => {
    try {
      if (currentDate) {
        const date = format(parseISO(currentDate.split('/')[1]), 'yyyy-MM-dd');

        if (today !== date) {
          dispatch(setSelectedDate(date));
          dispatch(setActiveDate(date));
        }

        if (periodType !== paramsPeriod && (paramsPeriod === 'day' || paramsPeriod === 'month')) {
          dispatch(setPeriodType(paramsPeriod));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Date parsing error:', error);
      router
        .push(`/calendar/${periodType}/${today}`)
        // eslint-disable-next-line no-console
        .catch((e) => console.error('Navigation error:', e));
    }
  }, [periodType, today, currentDate, router, dispatch, paramsPeriod]);

  return (
    <PageWrapper>
      <CalendarToolBar />
      {/* Replace Outlet with your Next.js implementation */}
      {/* {children} or other child route rendering mechanism */}
    </PageWrapper>
  );
}

import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import PeriodPaginator from '@/components/calendar/PeriodPaginator';
import StatisticsComp from '@/components/statistics/StatisticsComp';
import StatisticsInfo from '@/components/statistics/StatisticsInfo';
import { selectActiveDate, selectPeriodType } from '@/stores/date/dateSelectors';
import { setActiveDate, setPeriodType, setSelectedDate } from '@/stores/date/dateSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import Layout from '@/components/Layout';

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

const StatisticWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.variable.secondaryBg,
  borderRadius: '16px',
  padding: '28px 14px 135px 14px',
  [theme.breakpoints.up('md')]: {
    padding: '132px 32px 224px 32px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '134px 113px 104px 113px',
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '307px',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    width: '600px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '800px',
  },
}));

const CalendarContainer = styled(Box)(({ theme }) => ({
  width: '307px',
  [theme.breakpoints.up('md')]: {
    width: '230px',
  },
}));

// ----------------------------------------------------------------------

function StatisticsPage(): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const today = useAppSelector(selectActiveDate);
  const periodType = useAppSelector(selectPeriodType);

  const { date: dateParam } = router.query;
  const normalizedDate = typeof dateParam === 'string' ? dateParam.split('/')[1] : '';

  const theme = useTheme();

  useEffect(() => {
    if (periodType === 'month') dispatch(setPeriodType('day'));

    try {
      if (normalizedDate) {
        const date = format(parseISO(normalizedDate), 'yyyy-MM-dd');
        if (today !== date) {
          dispatch(setSelectedDate(date));
          dispatch(setActiveDate(date));
        }
      }
    } catch (error) {
      router.push(`/statistics/${periodType}/${today}`);
    }
  }, [dispatch, normalizedDate, periodType, router, today]);

  return (
    <Layout>
      <PageWrapper>
        <StatisticWrapper>
          <PaginationContainer>
            <CalendarContainer>
              <PeriodPaginator />
            </CalendarContainer>
            <StatisticsInfo />
          </PaginationContainer>
          <StatisticsComp />
        </StatisticWrapper>
      </PageWrapper>
    </Layout>
  );
}

export default StatisticsPage;

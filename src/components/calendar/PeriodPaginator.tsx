import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';
import { addDays, addMonths, format, parse, subDays, subMonths } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { selectActiveDate, selectPeriodType } from '@/stores/date/dateSelectors';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchTasks } from '@/stores/task/taskOperations';

// ----------------------------------------------------------------------

// Stub for authorization slice
const useAuthStub = () => ({
  createdAt: format(new Date(), 'yyyy-MM-dd'), // current date as placeholder
});

const DatePickerWrapper = styled(Box)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  marginRight: '8px',
  '& .react-datepicker__today-button': {
    border: 'none',
    background: 'none',
  },
  '& input': {
    display: 'inline',
    textAlign: 'center',
    padding: 0,
    backgroundColor: '#3e85f3',
    outline: 'none',
    border: 'none',
    borderRadius: '8px',
    height: '34px',
    [theme.breakpoints.down('md')]: {
      height: '30px',
    },
    width: '140px',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: 'calc(14 / 18)',
  },
  '& .react-datepicker': {
    backgroundColor: '#3e85f3',
    color: 'white',
    borderRadius: '16px',
  },
  '& .react-datepicker__header': {
    backgroundColor: '#3e85f3',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  '& .react-datepicker__triangle::after, & .react-datepicker__triangle::before': {
    backgroundColor: '#3e85f3',
    display: 'none',
  },
  '& .react-datepicker__current-month': {
    fontSize: '16px',
    marginBottom: '18px',
    color: 'white',
  },
  '& .react-datepicker__day-name, & .react-datepicker__day.react-datepicker__day--outside-month': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  '& .react-datepicker__navigation-icon::before': {
    borderColor: 'white',
  },
  '& .react-datepicker__week:last-of-type': {
    marginBottom: 0,
  },
  '& .react-datepicker__week:not(:last-of-type)': {
    marginBottom: '7px',
  },
  '& .react-datepicker__day.react-datepicker__day--selected': {
    borderRadius: '50%',
    color: '#3e85f3',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  '& .react-datepicker__day.react-datepicker__day--today': {
    backgroundColor: '#fff',
    borderRadius: '50%',
    color: '#3e85f3',
    fontWeight: 500,
  },
  '& .react-datepicker__day--keyboard-selected': {
    border: 'none',
    background: 'none',
  },
  '& .react-datepicker__day': {
    color: 'inherit',
    fontSize: '14px',
  },
}));

const ControlWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '18px',
  },
}));

const Controls = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '36px',
  height: '34px',
  minWidth: 'unset',
  padding: 0,
  [theme.breakpoints.down('md')]: {
    height: '30px',
  },
  backgroundColor: theme.palette.variable.CalendarLinkColor,
  border: `1px solid ${theme.palette.variable.borderColorWeekCalendar}`,
  color: theme.palette.variable.calendarTextColor,
  '&:disabled': {
    backgroundColor: theme.palette.variable.mainBackgroundColor,
    color: theme.palette.variable.activeArrowColor,
  },
  [theme.breakpoints.up('md')]: {
    width: '38px',
  },
  '&:first-of-type': {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderRightWidth: '0.5px',
  },
  '&:last-of-type': {
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    borderLeftWidth: '0.5px',
  },
}));

// ----------------------------------------------------------------------

function PeriodPaginator() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Using a stub instead of a real selector
  const { createdAt } = useAuthStub();
  // const { createdAt } = useAppSelector(selectUser); // Real selector when it's ready

  const periodType = useAppSelector(selectPeriodType);
  const currentDate = useAppSelector(selectActiveDate);

  const prevDateRef = useRef(parse(currentDate, 'yyyy-MM-dd', new Date()));
  const isDisable = new Date(currentDate) <= new Date(createdAt);
  const date = parse(currentDate, 'yyyy-MM-dd', new Date());

  useEffect(() => {
    if (format(date, 'yyyy-MM') !== format(prevDateRef.current, 'yyyy-MM')) {
      dispatch(fetchTasks(format(date, 'yyyy-MM')));
    }
  }, [dispatch, date, currentDate]);

  useEffect(() => {
    prevDateRef.current = parse(currentDate, 'yyyy-MM-dd', new Date());
  }, [currentDate]);

  const handleDateChange = (value: Date | null) => {
    if (value) {
      router.push(`/calendar/${periodType}/${format(value, 'yyyy-MM-dd')}`);
    }
  };

  const handlePrevPeriod = () => {
    const newDate = periodType === 'month' ? subMonths(date, 1) : subDays(date, 1);
    router.push(`/calendar/${periodType}/${format(newDate, 'yyyy-MM-dd')}`);
  };

  const handleNextPeriod = () => {
    const newDate = periodType === 'month' ? addMonths(date, 1) : addDays(date, 1);
    router.push(`/calendar/${periodType}/${format(newDate, 'yyyy-MM-dd')}`);
  };

  return (
    <ControlWrapper>
      <DatePickerWrapper>
        <ReactDatePicker
          selected={date}
          onChange={handleDateChange}
          calendarStartDay={1}
          dateFormat={periodType === 'month' ? 'MMMM yyyy' : 'dd MMM yyyy'}
          closeOnScroll
          formatWeekDay={(nameOfDay: string) => nameOfDay.substring(0, 1)}
          todayButton="Today"
          minDate={new Date(createdAt)}
        />
      </DatePickerWrapper>
      <Box>
        <Controls disabled={isDisable} onClick={handlePrevPeriod}>
          <ArrowBackIosNew fontSize="small" />
        </Controls>
        <Controls onClick={handleNextPeriod}>
          <ArrowForwardIos fontSize="small" />
        </Controls>
      </Box>
    </ControlWrapper>
  );
}

export default PeriodPaginator;

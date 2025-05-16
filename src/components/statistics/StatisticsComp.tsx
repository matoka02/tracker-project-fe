import { Box, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

import { selectSelectedDate } from '@/stores/date/dateSelectors';
import { useAppSelector } from '@/stores/hooks';
import { selectTasks } from '@/stores/task/taskSelectors';

// ----------------------------------------------------------------------

const Container = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.variable.borderColor}`,
  margin: '0 auto',
  borderRadius: '20px',
  padding: '40px 14px',
  [theme.breakpoints.down('sm')]: {
    width: '307px',
    height: '413px',
  },
  [theme.breakpoints.up('md')]: {
    width: '640px',
    height: '424px',
    borderRadius: '29px',
    padding: '32px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '860px',
    height: '440px',
    padding: '40px',
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '279px',
    height: '333px',
  },
  [theme.breakpoints.up('md')]: {
    width: '576px',
    height: '360px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '780px',
    height: '360px',
  },
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.variable.text,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const LabelTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.variable.activeTextColorBtn,
  fontFamily: 'InterMedium',
  fontSize: '16px',
  fontStyle: 'italic',
  lineHeight: '150%',
  margin: 0,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.variable.titleAvatar,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '150%',
  margin: 0,
}));

// ----------------------------------------------------------------------

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      dayf: string;
      monthf: string;
    };
  }>;
}

interface ChartData {
  name: string;
  day: number;
  month: number;
  dayf: string;
  monthf: string;
}

function CustomTooltip({ active = false, payload = [] }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <LabelContainer>
        <LabelTitle>{`All tasks for the ${payload[0].name}: ${payload[0].value}`}</LabelTitle>
        <LabelTitle>{`All tasks for a ${payload[1].name}: ${payload[1].value}`}</LabelTitle>
      </LabelContainer>
    );
  }
  return null;
}

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
};

function StatisticsComp(): React.ReactElement {
  // const muiTheme = useTheme();
  // const theme = useAppSelector(selectCurrentTheme);
  const theme = useTheme();
  const toDay = useAppSelector(selectSelectedDate);
  const tasks = useAppSelector(selectTasks);

  const getFilteredTasks = (tasksList: Task[]) => {
    const filteredTasksByDay = tasksList.filter(
      (task) => new Date(task.date).getDate() === new Date(toDay).getDate()
    );
    const filteredTasksByMonth = tasksList.filter(
      (task) => new Date(task.date).getMonth() === new Date(toDay).getMonth()
    );

    const todoByDay = filteredTasksByDay.filter((task) => task.category === 'to-do').length;
    const inprogressByDay = filteredTasksByDay.filter(
      (task) => task.category === 'in-progress'
    ).length;
    const doneByDay = filteredTasksByDay.filter((task) => task.category === 'done').length;

    const todoByMonth = filteredTasksByMonth.filter((task) => task.category === 'to-do').length;
    const inprogressByMonth = filteredTasksByMonth.filter(
      (task) => task.category === 'in-progress'
    ).length;
    const doneByMonth = filteredTasksByMonth.filter((task) => task.category === 'done').length;

    return {
      todoByDay,
      inprogressByDay,
      doneByDay,
      todoByMonth,
      inprogressByMonth,
      doneByMonth,
      allTasksByDay: todoByDay + inprogressByDay + doneByDay,
      allTasksByMonth: todoByMonth + inprogressByMonth + doneByMonth,
    };
  };

  const {
    todoByDay,
    inprogressByDay,
    doneByDay,
    todoByMonth,
    inprogressByMonth,
    doneByMonth,
    allTasksByDay,
    allTasksByMonth,
  } = getFilteredTasks(tasks);

  const data: ChartData[] = [
    {
      name: 'To Do',
      day: todoByDay,
      month: todoByMonth,
      dayf: `${Math.round((todoByDay / allTasksByDay) * 100) || 0}%`,
      monthf: `${Math.round((todoByMonth / allTasksByMonth) * 100) || 0}%`,
    },
    {
      name: 'In Progress',
      day: inprogressByDay,
      month: inprogressByMonth,
      dayf: `${Math.round((inprogressByDay / allTasksByDay) * 100) || 0}%`,
      monthf: `${Math.round((inprogressByMonth / allTasksByMonth) * 100) || 0}%`,
    },
    {
      name: 'Done',
      day: doneByDay,
      month: doneByMonth,
      dayf: `${Math.round((doneByDay / allTasksByDay) * 100) || 0}%`,
      monthf: `${Math.round((doneByMonth / allTasksByMonth) * 100) || 0}%`,
    },
  ];

  return (
    <Container>
      <Title variant="h6">Tasks</Title>
      <Wrapper>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 24, right: 10, left: 10, bottom: 10 }} barGap={14}>
            <defs>
              <linearGradient id="colorDay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFD2DD" stopOpacity={0} />
                <stop offset="95%" stopColor="#FFD2DD" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3E85F3" stopOpacity={0} />
                <stop offset="95%" stopColor="#3E85F3" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={
                theme.colorSchemes.light
                  ? theme.palette.variable.borderColor || '#E3F3FF'
                  : 'rgba(227, 243, 255, 0.15)'
              }
            />
            <XAxis
              stroke={theme.colorSchemes.light ? '#343434' : '#fff'}
              dataKey="name"
              axisLine={false}
              tickLine={false}
              height={40}
            />
            <YAxis
              stroke={theme.colorSchemes.light ? '#343434' : '#fff'}
              axisLine={false}
              tickLine={false}
              width={40}
              allowDecimals={false}
              tickMargin={20}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="day" fill="url(#colorDay)" barSize={27}>
              <LabelList
                fill={theme.colorSchemes.light ? '#343434' : '#fff'}
                dataKey="dayf"
                position="top"
              />
            </Bar>
            <Bar dataKey="month" fill="url(#colorMonth)" barSize={27}>
              <LabelList
                fill={theme.colorSchemes.light ? '#343434' : '#fff'}
                dataKey="monthf"
                position="top"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Wrapper>
    </Container>
  );
}

export default StatisticsComp;

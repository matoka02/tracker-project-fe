import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectDateState = (state: RootState) => state.date;

export const selectSelectedDate = createSelector(selectDateState, (date) => date.selectedDate);

export const selectActiveDate = createSelector(selectDateState, (date) => date.activeDate);

export const selectPeriodType = createSelector(selectDateState, (date) => date.periodType);

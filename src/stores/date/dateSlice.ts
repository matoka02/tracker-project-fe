import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

type PeriodType = 'month' | 'day';

export interface DateState {
  selectedDate: string;
  activeDate: string;
  periodType: PeriodType;
}

const PERIOD: Record<string, PeriodType> = {
  Month: 'month',
  Day: 'day',
};

const initialState: DateState = {
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  activeDate: format(new Date(), 'yyyy-MM-dd'),
  periodType: PERIOD.Month,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setActiveDate: (state, action: PayloadAction<string>) => ({
      ...state,
      activeDate: action.payload,
    }),
    setSelectedDate: (state, action: PayloadAction<string>) => ({
      ...state,
      selectedDate: action.payload,
    }),
    setPeriodType: (state, action: PayloadAction<PeriodType>) => ({
      ...state,
      periodType: action.payload,
    }),
  },
});

export const { setActiveDate, setSelectedDate, setPeriodType } = dateSlice.actions;
export default dateSlice.reducer;

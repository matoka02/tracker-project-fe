import { configureStore } from '@reduxjs/toolkit';

import dateReducer from './date/dateSlice';
import tasksReducer from './task/taskSlice';
import themeReducer from './theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    date: dateReducer,
    tasks: tasksReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

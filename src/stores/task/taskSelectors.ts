import { RootState } from '../store';

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectIsLoading = (state: RootState) => state.tasks.isLoading;
export const selectError = (state: RootState) => state.tasks.error;

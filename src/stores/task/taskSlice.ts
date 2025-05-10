/* eslint-disable no-underscore-dangle */
import { Action, ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITask } from '../types';

import { addTask, deleteTask, fetchTasks, getAllTasks, updateTask } from './taskOperations';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

// pending
const handleTaskPending = (state: TaskState) => ({
  ...state,
  isLoading: true,
  error: null,
});

// rejected
const handleTaskRejected = (state: TaskState, action: PayloadAction<any>) => {
  const errorMessage = action.payload;

  return {
    ...state,
    isLoading: false,
    tasks: errorMessage.includes('have no any task') ? [] : state.tasks,
    error: errorMessage,
  };
};

// All tasks
const handleFetchAllTasksFulfilled = (state: TaskState, action: PayloadAction<ITask[]>) => ({
  ...state,
  tasks: action.payload,
  isLoading: false,
  error: null,
});

// Tasks by month
const handleFetchTasksByMonthFulfilled = (state: TaskState, action: PayloadAction<ITask[]>) => ({
  ...state,
  tasks: action.payload,
  isLoading: false,
  error: null,
});

// Add task
const handleAddTaskFulfilled = (state: TaskState, action: PayloadAction<ITask>) => ({
  ...state,
  tasks: [...state.tasks, action.payload],
  isLoading: false,
  error: null,
});

// Update task
const handleUpdateTaskFulfilled = (state: TaskState, action: PayloadAction<ITask>) => {
  const updatedTask = action.payload;
  if (!updatedTask?._id) return state;

  return {
    ...state,
    tasks: state.tasks.map((task) =>
      task._id === updatedTask._id ? { ...task, ...updatedTask } : task
    ),
    isLoading: false,
    error: null,
  };
};

// Delete task
const handleDeleteTaskFulfilled = (state: TaskState, action: PayloadAction<string>) => ({
  ...state,
  tasks: state.tasks.filter((task) => task._id !== action.payload._id),
  isLoading: false,
  error: null,
});

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TaskState>) => {
    builder
      // All tasks
      .addCase(getAllTasks.fulfilled, handleFetchAllTasksFulfilled)
      // Tasks by month
      .addCase(fetchTasks.fulfilled, handleFetchTasksByMonthFulfilled)
      // Add task
      .addCase(addTask.fulfilled, handleAddTaskFulfilled)
      // Update task
      .addCase(updateTask.fulfilled, handleUpdateTaskFulfilled)
      // Delete task
      .addCase(deleteTask.fulfilled, handleDeleteTaskFulfilled)
      // .addCase(logOut, (state) => {
      //   state.tasks = [];
      //   state.isLoading = false;
      //   state.error = null;
      // });
      // pending
      .addMatcher((action: Action) => action.type.endsWith('/pending'), handleTaskPending)
      // rejected
      .addMatcher((action: Action) => action.type.endsWith('/rejected'), handleTaskRejected);
  },
});

export default tasksSlice.reducer;

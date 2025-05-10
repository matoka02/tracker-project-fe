import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { INewTask, ITask } from '../types';

axios.defaults.baseURL = 'https://tracker-3sdo.onrender.com/api/v1';

export const getAllTasks = createAsyncThunk<
  ITask[],
  void
  // { dispatch: AppDispatch; state: RootState }
>('tasks/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/tasks');
    return res.data.tasks;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchTasks = createAsyncThunk<
  ITask[],
  string
  // { dispatch: AppDispatch; state: RootState }
>('tasks/fetchTasks', async (month, thunkAPI) => {
  try {
    const res = await axios.get(`/tasks?month=${month}`);
    return res.data.tasks;
  } catch (error: any) {
    if (error.response?.data?.message?.includes('have no any task')) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTask = createAsyncThunk<
  ITask,
  Partial<INewTask>
  // { dispatch: AppDispatch; state: RootState }
>('tasks/addTask', async (task, thunkAPI) => {
  try {
    const res = await axios.post('/tasks', task);
    return res.data.task;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk<
  string,
  string
  // { dispatch: AppDispatch; state: RootState }
>('tasks/deleteTask', async (id, thunkAPI) => {
  try {
    await axios.delete(`/tasks/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface UpdateTaskPayload {
  id: string;
  updatedTask: Partial<Task>;
}

export const updateTask = createAsyncThunk<
  ITask,
  UpdateTaskPayload
  // { dispatch: AppDispatch; state: RootState }
>('tasks/updateTask', async ({ id, updatedTask }, thunkAPI) => {
  try {
    const res = await axios.patch(`/tasks/${id}`, updatedTask);
    return { ...res.data.task, id };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

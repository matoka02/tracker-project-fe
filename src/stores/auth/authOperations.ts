import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../types';

export interface AuthState {
  user: Partial<IUser>;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading?: boolean;
  error?: string | null;
}

axios.defaults.baseURL = 'https://tracker-3sdo.onrender.com/api/v1';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

interface Credentials {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/register', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error: any) {
      throw new Error('This email or password is already in use');
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk('auth/login', async (credentials: Credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    setAuthHeader(data.token);
    return data;
  } catch (error: any) {
    throw new Error('Login or password failed. Try again.');
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
    window.location.href = '/';
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const currentUser = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const { token } = state.auth;

  if (!token) {
    throw new Error('Unable to fetch user');
  }

  try {
    setAuthHeader(token);
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<IUser>, thunkAPI) => {
    try {
      const { data } = await axios.patch('/users/edit', user);
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

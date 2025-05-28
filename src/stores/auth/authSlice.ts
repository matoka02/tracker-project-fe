import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../types';

import { currentUser, logIn, logOut, register, updateUser } from './authOperations';

interface AuthState {
  user: Partial<IUser>;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading?: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  user: {},
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

// pending
const handleAuthPending = (state: AuthState) => ({
  ...state,
  isLoading: true,
  error: null,
});

// rejected
const handleAuthRejected = (state: AuthState, action: PayloadAction<any>) => ({
  ...state,
  isLoading: false,
  error: action.payload,
});

// Register and login
const handleLoginFulfilled = (state: AuthState, action: PayloadAction<any>) => ({
  ...state,
  user: action.payload.user,
  token: action.payload.token,
  isLoggedIn: true,
});

// Logout
const handleLogoutFulfilled = (state: AuthState) => ({
  ...state,
  user: {
    name: null,
    email: null,
    phone: null,
    skype: null,
    birthday: null,
  },
  token: null,
  isLoggedIn: false,
});

// Current user
const handleCurrentUserPending = (state: AuthState) => ({
  ...state,
  isRefreshing: true,
  error: null,
});
const handleCurrentUserFulfilled = (state: AuthState, action: PayloadAction<any>) => ({
  ...state,
  isRefreshing: false,
  user: action.payload.user,
  isLoggedIn: true,
});
const handleCurrentUserRejected = (state: AuthState, action: PayloadAction<any>) => ({
  ...state,
  isRefreshing: false,
  error: action.payload,
});

// Update user
const handleUpdateUserFulfilled = (state: AuthState, action: PayloadAction<any>) => ({
  ...state,
  user: action.payload.user,
  isLoading: false,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanAuthData() {
      localStorage.removeItem('token');
      return {
        user: {},
        isLoggedIn: false,
        token: null,
        isRefreshing: false,
        isLoading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      // Register
      .addCase(register.pending, handleAuthPending)
      .addCase(register.fulfilled, handleLoginFulfilled)
      .addCase(register.rejected, handleAuthRejected)
      // Login
      .addCase(logIn.pending, handleAuthPending)
      .addCase(logIn.fulfilled, handleLoginFulfilled)
      .addCase(logIn.rejected, handleAuthRejected)
      // Logout
      .addCase(logOut.pending, handleAuthPending)
      .addCase(logOut.fulfilled, handleLogoutFulfilled)
      .addCase(logOut.rejected, handleAuthRejected)
      // Current user
      .addCase(currentUser.pending, handleCurrentUserPending)
      .addCase(currentUser.fulfilled, handleCurrentUserFulfilled)
      .addCase(currentUser.rejected, handleCurrentUserRejected)
      // Update user
      .addCase(updateUser.pending, handleAuthPending)
      .addCase(updateUser.fulfilled, handleUpdateUserFulfilled)
      .addCase(updateUser.rejected, handleAuthRejected);
  },
});

export const { cleanAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;

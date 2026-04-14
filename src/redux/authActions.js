import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, phone, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', { name, email, phone, password });
      // API response mein token aur user data ho sakta hai
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Registration failed. Please try again.'
      );
    }
  }
);

export const loginUser = createAsyncThunk( // Existing loginUser
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // api instance automatically uses VITE_API_URL aur application/json format set karta hai
      const response = await api.post('/auth/login', { email, password });
      return response.data; // user, token, role yahan return honge
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed. Please try again.'
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to send OTP'
      );
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Invalid OTP'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword, resetToken }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/reset-password', { email, newPassword, resetToken });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to reset password'
      );
    }
  }
);
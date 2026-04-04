import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice'; // CRUD template

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});
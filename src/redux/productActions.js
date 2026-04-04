import { createAsyncThunk } from '@reduxjs/toolkit';

// Yahan apna actual backend API URL daalna
const BASE_URL = 'http://172.27.176.1:3000/api/products'; 

// 1. READ: Saare products fetch karne ke liye
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
      return data; // Expected array of products
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. CREATE: Naya product add karne ke liye
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create product');
      return data; // Naya create hua product return karega
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. UPDATE: Product edit karne ke liye (ID pass karna zaroori hai)
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update product');
      return data; // Updated product return karega
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 4. DELETE: Product delete karne ke liye
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete product');
      }
      return id; // Frontend me state se hatane ke liye ID return kar rahe hain
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
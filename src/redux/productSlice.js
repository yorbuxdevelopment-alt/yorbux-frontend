import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './productActions';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // API se aayi hui list state me save
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // CREATE PRODUCT
      .addCase(createProduct.fulfilled, (state, action) => {
        // Naya product list me add ho jayega
        state.products.push(action.payload);
      })
      
      // UPDATE PRODUCT
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Jo product update hua hai usko list me replace karenge
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      
      // DELETE PRODUCT
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Deleted product ki id filter karke list clean karenge
        state.products = state.products.filter(p => p.id !== action.payload);
      })

      // Catching errors for all write operations silently (optional, can be detailed)
      .addMatcher(
        (action) => action.type.endsWith('/rejected') && action.type.startsWith('products/'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
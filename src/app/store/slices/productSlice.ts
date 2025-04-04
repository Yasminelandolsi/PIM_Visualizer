import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/category.types';
import { getProductsByCategory } from '../../mockData/productData';

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null
};

// Async thunk to fetch products by category ID
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (categoryId: string) => {
    // In a real app, you would make an API call here
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return getProductsByCategory(categoryId);
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default productSlice.reducer;
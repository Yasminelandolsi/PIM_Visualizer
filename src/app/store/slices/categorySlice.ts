import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types/category.types';
import { allCategories, getCategoryById } from '../../mockData/categoryData';

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  categories: allCategories, // We can initialize with mock data
  currentCategory: null,
  status: 'idle',
  error: null
};

// Async thunk for fetching a single category by ID
export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId: string) => {
    // In a real app, you would make an API call here
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const category = getCategoryById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch category';
      });
  }
});

export default categorySlice.reducer;
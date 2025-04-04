import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductDetail } from '../../types/product.type';
import { getProductDetailById } from '../../mockData/productDetailData';

interface ProductDetailState {
  productDetail: ProductDetail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductDetailState = {
  productDetail: null,
  status: 'idle',
  error: null
};

// Async thunk to fetch product detail
export const fetchProductDetail = createAsyncThunk(
    'productDetail/fetchById',
    async (productIdOrReference: string) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const product = getProductDetailById(productIdOrReference);
        if (!product) {
          throw new Error(`Product with ID or reference "${productIdOrReference}" not found`);
        }
        
        return product;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch product details');
      }
    }
  );

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.productDetail = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action: PayloadAction<ProductDetail>) => {
        state.status = 'succeeded';
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product details';
      });
  }
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
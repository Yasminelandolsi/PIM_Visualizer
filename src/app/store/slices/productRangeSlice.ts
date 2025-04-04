import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductDetailById } from '../../mockData/productDetailData';
import { ProductRange, ProductDetail } from '../../types/product.type';

interface ProductRangeState {
  rangeId: string;
  rangeData: ProductRange | null;
  sourceProduct: ProductDetail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductRangeState = {
  rangeId: '',
  rangeData: null,
  sourceProduct: null,
  status: 'idle',
  error: null
};

// Thunk to fetch product range data
export const fetchProductRange = createAsyncThunk(
  'productRange/fetchByRangeId',
  async (params: { rangeId: string; productId?: string }) => {
    try {
      // If we have a product ID, fetch that product first
      let product = null;
      if (params.productId) {
        product = getProductDetailById(params.productId);
        if (product && product.productRange && product.productRange.rangeId === params.rangeId) {
          return { rangeData: product.productRange, sourceProduct: product };
        }
      }
      
      // Otherwise search all products to find one with matching range ID
      const productDetails = await import('../../mockData/productDetailData')
        .then(module => module.getAllProductDetails());
      
      // Find a product that has this range ID
      const matchingProduct = productDetails.find(
        p => p.productRange && p.productRange.rangeId === params.rangeId
      );
      
      if (!matchingProduct || !matchingProduct.productRange) {
        throw new Error(`Product range with ID "${params.rangeId}" not found`);
      }
      
      return { 
        rangeData: matchingProduct.productRange,
        sourceProduct: matchingProduct
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch product range');
    }
  }
);

const productRangeSlice = createSlice({
  name: 'productRange',
  initialState,
  reducers: {
    clearProductRange: (state) => {
      state.rangeData = null;
      state.sourceProduct = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductRange.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductRange.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rangeData = action.payload.rangeData;
        state.sourceProduct = action.payload.sourceProduct;
      })
      .addCase(fetchProductRange.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product range details';
      });
  }
});

export const { clearProductRange } = productRangeSlice.actions;
export default productRangeSlice.reducer;
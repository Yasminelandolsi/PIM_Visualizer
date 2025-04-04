import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import filterReducer from './slices/filterSlice';
import productDetailReducer from './slices/productDetailSlice';
import productRangeReducer from './slices/productRangeSlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    filters: filterReducer,
    productDetail: productDetailReducer,
    productRange: productRangeReducer,

  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
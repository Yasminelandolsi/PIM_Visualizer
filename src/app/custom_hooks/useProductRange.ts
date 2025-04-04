import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProductRange, clearProductRange } from '../store/slices/productRangeSlice';

export const useProductRange = (rangeId: string, productId?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { rangeData, sourceProduct, status, error } = useSelector(
    (state: RootState) => state.productRange
  );
  
  useEffect(() => {
    if (rangeId) {
      dispatch(fetchProductRange({ rangeId, productId }));
    }
    
    return () => {
      dispatch(clearProductRange());
    };
  }, [dispatch, rangeId, productId]);
  
  return {
    rangeData,
    sourceProduct,
    isLoading: status === 'loading',
    isError: status === 'failed',
    error
  };
};
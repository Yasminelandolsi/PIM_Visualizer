import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProductDetail, clearProductDetail } from '../store/slices/productDetailSlice';

export const useProductDetail = (productId: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { productDetail, status, error } = useSelector(
    (state: RootState) => state.productDetail
  );
  
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
    
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, productId]);
  
  return {
    product: productDetail,
    isLoading: status === 'loading',
    isError: status === 'failed',
    error
  };
};
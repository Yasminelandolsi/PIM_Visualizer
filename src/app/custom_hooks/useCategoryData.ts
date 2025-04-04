import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store'; 
import { fetchCategoryById } from '../store/slices/categorySlice';
import { fetchProductsByCategory } from '../store/slices/productSlice';

export function useCategoryData(categoryId: string) {
    const dispatch = useDispatch<AppDispatch>();
  
  const { currentCategory, status: categoryStatus } = useSelector(
    (state: RootState) => state.categories
  );
  
  const { products, status: productStatus } = useSelector(
    (state: RootState) => state.products
  );
  
  const {
    subcategoryFilter,
    manufacturerFilter,
    erpReferenceFilter,
    languageFilter,
    enrichmentFilter,
    filterOptions,
    sortBy,
    viewMode
  } = useSelector((state: RootState) => state.filters);
  
  // Fetch category and products when component mounts or categoryId changes
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryById(categoryId));
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [dispatch, categoryId]);
  
  // Apply filters to products
  const filteredProducts = products
    .filter(product => {
      // Filter by subcategory
      if (subcategoryFilter.length === 0) return true;
      return subcategoryFilter.includes(product.subcategory || '');
    })
    .filter(product => {
      // Filter by manufacturer
      if (manufacturerFilter.length === 0) return true;
      return manufacturerFilter.includes(product.manufacturer);
    })
    .filter(product => {
      // Filter by ERP reference
      if (!erpReferenceFilter) return true;
      return product.erpReference.includes(erpReferenceFilter);
    })
    .filter(product => {
      // Filter by language
      if (!languageFilter) return true;
      return product.availableLanguages?.includes(languageFilter) || false;
    })
    .filter(product => {
      // Filter by enrichment level
      if (!enrichmentFilter) return true;
      return product.enrichmentLevel === enrichmentFilter;
    });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0; // Default sorting (featured)
    }
  });
  
  return {
    category: currentCategory,
    products: sortedProducts,
    isLoading: categoryStatus === 'loading' || productStatus === 'loading',
    filterOptions,
    viewMode
  };
}
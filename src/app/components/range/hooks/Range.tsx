import { RangeProduct } from '../../../types/range.type';
import { useProductSearch } from './Search';
import { useProductSort } from './Sorting';
import { useProductFilter } from './Filtering';

export function useRangeProducts(products: RangeProduct[]) {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchedProducts 
  } = useProductSearch(products);
  
  const {
    activeFilters,
    showFilterPanel,
    specificationKeys,
    specValues,
    filteredProducts: filterResults,
    handleFilterChange,
    clearAllFilters,
    toggleFilterPanel
  } = useProductFilter(searchedProducts);
  
  const {
    sortField,
    sortDirection,
    sortedProducts,
    handleSort
  } = useProductSort(filterResults);
  
  const resetAllFilters = () => {
    setSearchTerm('');
    clearAllFilters();
  };
  
  return {
    // Search
    searchTerm,
    setSearchTerm,
    
    // Filter
    activeFilters,
    showFilterPanel,
    specificationKeys,
    specValues,
    handleFilterChange,
    toggleFilterPanel,
    
    // Sort
    sortField,
    sortDirection,
    handleSort,
    
    // Final results
    filteredProducts: sortedProducts,
    resetAllFilters,
    
    // Stats
    totalCount: products.length,
    filteredCount: sortedProducts.length
  };
}
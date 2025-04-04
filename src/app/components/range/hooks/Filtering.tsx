import { useState, useMemo } from 'react';
import { RangeProduct, FilterState }  from '../../../types/range.type';
export function useProductFilter(products: RangeProduct[]) {
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  // Calculate specification keys
  const specificationKeys = useMemo(() => {
    const keysSet = new Set<string>();
    products.forEach(product => {
      Object.keys(product.specifications || {}).forEach(keysSet.add, keysSet);
    });
    return Array.from(keysSet);
  }, [products]);
  
  // Calculate specification values for filtering
  const specValues = useMemo(() => {
    const values: {[key: string]: Set<string>} = {};
    
    specificationKeys.forEach(key => {
      values[key] = new Set<string>();
    });
    
    products.forEach(product => {
      Object.entries(product.specifications || {}).forEach(([key, value]) => {
        values[key]?.add(value.toString());
      });
    });
    
    return Object.fromEntries(
      Object.entries(values).map(([key, set]) => [key, Array.from(set).sort()])
    );
  }, [products, specificationKeys]);
  
  // Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      for (const [specKey, allowedValues] of Object.entries(activeFilters)) {
        if (allowedValues.length > 0) {
          const productValue = product.specifications?.[specKey];
          if (!productValue || !allowedValues.includes(productValue)) {
            return false;
          }
        }
      }
      return true;
    });
  }, [products, activeFilters]);
  
  const handleFilterChange = (specKey: string, value: string, isChecked: boolean) => {
    setActiveFilters(prev => {
      const current = [...(prev[specKey] || [])];
      if (isChecked) {
        current.push(value);
      } else {
        const index = current.indexOf(value);
        if (index !== -1) current.splice(index, 1);
      }
      return { ...prev, [specKey]: current };
    });
  };
  
  const clearAllFilters = () => {
    setActiveFilters({});
  };
  
  const toggleFilterPanel = () => setShowFilterPanel(!showFilterPanel);
  
  return {
    activeFilters,
    showFilterPanel,
    specificationKeys,
    specValues,
    filteredProducts,
    handleFilterChange,
    clearAllFilters,
    toggleFilterPanel
  };
}
import { useState, useMemo } from 'react';
import { RangeProduct } from '../../../types/range.type';

export function useProductSearch(products: RangeProduct[]) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchedProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.euRef.toLowerCase().includes(searchLower) || 
      product.id.toLowerCase().includes(searchLower)
    );
  }, [products, searchTerm]);
  
  return {
    searchTerm,
    setSearchTerm,
    searchedProducts
  };
}
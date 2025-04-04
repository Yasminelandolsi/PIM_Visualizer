import { useState, useMemo } from 'react';
import { RangeProduct, SortDirection }  from '../../../types/range.type';

export function useProductSort(products: RangeProduct[]) {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } 
      else if (sortField === 'euRef') {
        return sortDirection === 'asc'
          ? a.euRef.localeCompare(b.euRef)
          : b.euRef.localeCompare(a.euRef);
      }
      else {
        const aVal = a.specifications?.[sortField] || '';
        const bVal = b.specifications?.[sortField] || '';
        return sortDirection === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }
    });
  }, [products, sortField, sortDirection]);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  return {
    sortField,
    sortDirection,
    sortedProducts,
    handleSort
  };
}
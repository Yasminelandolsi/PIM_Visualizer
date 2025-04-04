import { useState, useEffect } from 'react';
import { ViewMode }   from '../../../types/range.type';

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
  // Set view mode based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const toggleProductExpansion = (productId: string) => {
    setExpandedProduct(prev => prev === productId ? null : productId);
  };
  
  return {
    viewMode,
    setViewMode,
    expandedProduct,
    toggleProductExpansion
  };
}
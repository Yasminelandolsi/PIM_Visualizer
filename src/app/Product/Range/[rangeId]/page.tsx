'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { productData } from '../../../mockData/productData';
import BreadcrumbNav from '../../../components/Product/Breadcrumb';
import { RangeProduct, FilterState, SortDirection, ViewMode } from '../../../types/range.type';
import SearchFilterBar from '../../../components/range/SearchFilterBar';
import FilterPanel from '../../../components/range/FilterPanel';
import ActiveFilters from '../../../components/range/ActiveFilters';
import ProductTable from '../../../components/range/ProductTable';
import ProductCards from '../../../components/range/ProductCards';
import EmptyState from '../../../components/range/EmptyState';

export default function RangePage({ params }: { params: { rangeId: string } }) {
  // URL params
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || "";
  const productName = searchParams.get('productName') || "";
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  
  // Get products data
  const products = productData.productRange.products as RangeProduct[];
  
  // Calculate specification keys
  const specificationKeys = useMemo(() => {
    const keysSet = new Set<string>();
    products.forEach(product => {
      Object.keys(product.specifications).forEach(keysSet.add, keysSet);
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
      Object.entries(product.specifications).forEach(([key, value]) => {
        values[key]?.add(value.toString());
      });
    });
    
    return Object.fromEntries(
      Object.entries(values).map(([key, set]) => [key, Array.from(set).sort()])
    );
  }, [products, specificationKeys]);
  
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Text search
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          if (!product.name.toLowerCase().includes(searchLower) && 
              !product.euRef.toLowerCase().includes(searchLower) &&
              !product.id.toLowerCase().includes(searchLower)) {
            return false;
          }
        }
        
        // Specification filters
        for (const [specKey, allowedValues] of Object.entries(activeFilters)) {
          if (allowedValues.length > 0) {
            const productValue = product.specifications[specKey];
            if (!productValue || !allowedValues.includes(productValue)) {
              return false;
            }
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sorting logic
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
          const aVal = a.specifications[sortField] || '';
          const bVal = b.specifications[sortField] || '';
          return sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
      });
  }, [products, searchTerm, activeFilters, sortField, sortDirection]);
  
  // Event handlers
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
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
    setSearchTerm('');
    setActiveFilters({});
  };
  
  const toggleProductExpansion = (productId: string) => {
    setExpandedProduct(prev => prev === productId ? null : productId);
  };
  
  const toggleFilterPanel = () => setShowFilterPanel(!showFilterPanel);
  
  // Set view mode based on screen size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 pb-16">
      <BreadcrumbNav items={[
        { href: '/', label: 'Home' },
        { href: '/Category', label: productData.category },
        { href: `/Product/${productId}`, label: productName },
        { href: `/Product/Range/${params.rangeId}`, label: `Range: ${params.rangeId}` }
      ]} />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#041e50] mb-4">
          Product Range: {params.rangeId}
        </h1>
        
        {/* Controls container */}
        <div className="mb-4 bg-white rounded-lg shadow border border-gray-200">
          <SearchFilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilterPanel={showFilterPanel}
            toggleFilterPanel={toggleFilterPanel}
            activeFilters={activeFilters}
          />
          
          {showFilterPanel && (
            <FilterPanel 
              specificationKeys={specificationKeys}
              specValues={specValues}
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              closePanel={() => setShowFilterPanel(false)}
              clearAllFilters={clearAllFilters}
            />
          )}
          
          <ActiveFilters
            activeFilters={activeFilters}
            handleFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
          />
        </div>
        
        {/* Results count */}
        <div className="text-xs text-gray-500 mb-3">
          Showing {filteredProducts.length} out of {products.length} products
        </div>
        
        {/* Product display */}
        {filteredProducts.length > 0 ? (
          viewMode === 'table' ? (
            <ProductTable 
              products={filteredProducts}
              specificationKeys={specificationKeys}
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          ) : (
            <ProductCards
              products={filteredProducts}
              specificationKeys={specificationKeys}
              expandedProduct={expandedProduct}
              toggleProductExpansion={toggleProductExpansion}
            />
          )
        ) : (
          <EmptyState clearAllFilters={clearAllFilters} />
        )}
      </div>
    </div>
  );
}
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BreadcrumbNav from '@/app/components/Breadcrumb';
import { useProductRange } from '@/app/custom_hooks/useProductRange';
import { useRangeProducts } from '@/app/components/range/hooks/Range';
import { useViewMode } from '@/app/components/range/hooks/View';
import SearchFilterBar from '@/app/components/range/SearchFilterBar';
import FilterPanel from '@/app/components/range/FilterPanel';
import ActiveFilters from '@/app/components/range/ActiveFilters';
import ProductTable from '@/app/components/range/ProductTable';
import ProductCards from '@/app/components/range/ProductCards';
import EmptyResults from '@/app/components/EmptyResults';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useProductNavigation } from '@/app/custom_hooks/useProductNavigation';
import ProductPagination from '@/app/components/ProductPagination';

export default function RangePage({ params }: { params: { rangeId: string } }) {
  const { getProductDetailUrl } = useProductNavigation();

  // URL params
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || "";
  const productName = searchParams.get('productName') || "";
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
  
  // Get range data using the custom hook
  const { rangeData, sourceProduct, isLoading } = useProductRange(params.rangeId, productId);
  
  // Get products from range data (safely)
  const products = rangeData?.products || [];
  
  // Product operations (search, filter, sort)
  const {
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
    
    // Results
    filteredProducts,
    resetAllFilters,
    
    // Stats
    totalCount,
    filteredCount
  } = useRangeProducts(products);
  
  // View mode
  const {
    viewMode,
    setViewMode,
    expandedProduct,
    toggleProductExpansion
  } = useViewMode();

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchTerm, sortField, sortDirection]);

  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, pageSize]);

  // Handle pagination change
  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading product range..." />;
  }

  return (
    <div >
      <BreadcrumbNav items={[
        { href: '/', label: 'Home' },
        { href: `/category/${sourceProduct?.category || ''}`, label: sourceProduct?.category || 'Category' },
        { 
          href: sourceProduct ? getProductDetailUrl(sourceProduct) : '',
          label: `${sourceProduct?.name} (${sourceProduct?.reference})` || productName,
        }, 
        { href: `/product/range/${params.rangeId}`, label: `Range: ${params.rangeId}` }
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
              closePanel={() => toggleFilterPanel()}
              clearAllFilters={resetAllFilters}
            />
          )}
          
          <ActiveFilters
            activeFilters={activeFilters}
            handleFilterChange={handleFilterChange}
            clearAllFilters={resetAllFilters}
          />
        </div>
        
        {/* Results count with pagination info */}
        <div className="text-xs text-gray-500 mb-3">
          Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredCount)} of {filteredCount} out of {totalCount} products
        </div>
        
        {/* Product display - now using paginatedProducts */}
        {filteredCount > 0 ? (
          <>
            {viewMode === 'table' ? (
              <ProductTable 
                products={paginatedProducts}
                specificationKeys={specificationKeys}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
            ) : (
              <ProductCards
                products={paginatedProducts}
                specificationKeys={specificationKeys}
                expandedProduct={expandedProduct}
                toggleProductExpansion={toggleProductExpansion}
              />
            )}
            
            {/* Add pagination component */}
            <ProductPagination
              totalItems={filteredCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyResults 
          resetFilters={resetAllFilters} 
          message="No products match your current filters."
          buttonText="Clear all filters"
        />
        )}
      </div>
    </div>
  );
}
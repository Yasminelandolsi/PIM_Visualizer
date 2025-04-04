'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import BreadcrumbNav from "../../components/Breadcrumb";
import CategoryHeader from "../../components/category/CategoryHeader";
import SortingBar from "../../components/category/SortingBar";
import ProductGrid from "../../components/category/ProductGrid";
import MobileFilterToggle from "../../components/category/MobileFilterToggle";
import FilterSidebar from '../../components/category/filters/FilterSidebar';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useProductNavigation } from '@/app/custom_hooks/useProductNavigation';
import ProductPagination from '@/app/components/ProductPagination';
import EmptyResults from '../../components/EmptyResults';

import { useCategoryData } from '../../custom_hooks/useCategoryData';
import { RootState } from '../../store';
import { Product } from '../../types/category.types'; 
import { 
  toggleSubcategoryFilter, 
  setSubcategoryFilter,
  toggleManufacturerFilter,
  setErpReferenceFilter,
  setLanguageFilter,
  setEnrichmentFilter,
  setSortBy,
  setViewMode,
  resetFilters 
} from '../../store/slices/filterSlice';
import { useRouter } from 'next/navigation';

const CategoryPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');
  const router = useRouter();
  const { getProductDetailUrl } = useProductNavigation();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4); // 12 is good for grid view
  
  // Use custom hook to get category data, products and loading state
  const { category, products, isLoading, filterOptions, viewMode } = useCategoryData(params.id);
  
  // Get filter state from Redux
  const { 
    subcategoryFilter, 
    manufacturerFilter,
    erpReferenceFilter,
    languageFilter,
    enrichmentFilter,
    sortBy 
  } = useSelector((state: RootState) => state.filters);
  
  // Set subcategory filter from URL param
  useEffect(() => {
    if (subcategoryParam) {
      dispatch(setSubcategoryFilter(subcategoryParam ? [subcategoryParam] : []));
    }
  }, [dispatch, subcategoryParam]);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    subcategoryFilter,
    manufacturerFilter,
    erpReferenceFilter,
    languageFilter,
    enrichmentFilter,
    sortBy,
    params.id
  ]);
  
  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
  }, [products, currentPage, pageSize]);
  
  // Pagination handler
  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Mobile filter state
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);
  
  // Handle product detail navigation
  const handleViewDetails = (product: Product) => {
    router.push(getProductDetailUrl(product));
  };
  
  if (isLoading || !category) {
    return <LoadingSpinner message="Loading product details..." />;
  }
  
  return (
    <>
      <BreadcrumbNav 
        items={[
          { href: '/', label: 'Home' },
          { href: `/category/${params.id}`, label: category?.name || 'Category' }
        ]} 
      />
      
      <div className="min-h-screen bg-gray-50 py-6 px-2 pb-32 relative overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          
          <MobileFilterToggle 
            mobileFilterOpen={mobileFilterOpen} 
            toggleMobileFilter={() => setMobileFilterOpen(!mobileFilterOpen)} 
          />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar for Filtering */}
            <FilterSidebar 
              filterOptions={filterOptions}
              subcategoryFilter={subcategoryFilter}
              manufacturerFilter={manufacturerFilter}
              erpReferenceFilter={erpReferenceFilter}
              languageFilter={languageFilter}
              enrichmentFilter={enrichmentFilter}
              toggleSubcategoryFilter={(subcategory) => dispatch(toggleSubcategoryFilter(subcategory))}
              toggleManufacturerFilter={(manufacturer) => dispatch(toggleManufacturerFilter(manufacturer))}
              setErpReferenceFilter={(value) => dispatch(setErpReferenceFilter(value))}
              setLanguageFilter={(value) => dispatch(setLanguageFilter(value))}
              setEnrichmentFilter={(value) => dispatch(setEnrichmentFilter(value))}
              resetFilters={() => dispatch(resetFilters())}
              mobileFilterOpen={mobileFilterOpen}
            />
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Category Header */}
              <CategoryHeader 
                categoryName={category?.name || 'Category'}
                description={category?.description || 'No description available'} 
              />
              
              {/* Sorting and View Options */}
              <SortingBar 
                viewMode={viewMode}
                setViewMode={(mode) => dispatch(setViewMode(mode))}
                sortBy={sortBy}
                setSortBy={(sort) => dispatch(setSortBy(sort))}
                productCount={products.length}
              />
              
              {/* Results count with pagination info */}
              <div className="text-xs text-gray-500 mb-3">
                Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, products.length)} of {products.length} products
              </div>
              
              {/* Products Display - now uses paginatedProducts */}
              {products.length > 0 ? (
                <>
                  <ProductGrid 
                    products={paginatedProducts} 
                    viewMode={viewMode} 
                    resetFilters={() => dispatch(resetFilters())} 
                    onViewDetails={handleViewDetails}
                  />
                  
                  {/* Add pagination component */}
                  <ProductPagination
                    totalItems={products.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <EmptyResults
                  resetFilters={() => dispatch(resetFilters())}
                  message="No products found matching your criteria."
                  buttonText="Clear all filters"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
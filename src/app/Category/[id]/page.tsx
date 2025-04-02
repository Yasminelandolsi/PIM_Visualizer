'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BreadcrumbNav from "../../components/category/Breadcrumb";
import CategoryHeader from "../../components/category/CategoryHeader";
import SortingBar from "../../components/category/SortingBar";
import ProductGrid from "../../components/category/ProductGrid";
import MobileFilterToggle from "../../components/category/MobileFilterToggle";
import FilterSidebar from '../../components/category/filters/FilterSidebar';
import { sampleProducts, getFilterOptions, getCategoryById } from '../../mockData/categoryData';

const CategoryPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const searchParams = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');
  
  // Get category information
  const categoryInfo = getCategoryById(params.id);
  
  // Get filter options from the sample products - filtered for this category
  const categoryProducts = sampleProducts.filter(p => p.category === params.id);
  const filterOptions = getFilterOptions(categoryProducts);

  // State management
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [subcategoryFilter, setSubcategoryFilter] = useState<string[]>(
    subcategoryParam ? [subcategoryParam] : []
  );
  const [manufacturerFilter, setManufacturerFilter] = useState<string[]>([]);
  const [erpReferenceFilter, setErpReferenceFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [enrichmentFilter, setEnrichmentFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Update filters if subcategory changes in URL
  useEffect(() => {
    if (subcategoryParam) {
      setSubcategoryFilter([subcategoryParam]);
    } else {
      setSubcategoryFilter([]);
    }
  }, [subcategoryParam]);

  // Filter products
  const filteredProducts = sampleProducts
    .filter(product => {
      if (subcategoryFilter.length === 0) return true;
      return subcategoryFilter.includes(product.subcategory || '');
    })
    .filter(product => {
      if (manufacturerFilter.length === 0) return true;
      return manufacturerFilter.includes(product.manufacturer);
    })
    .filter(product => {
      if (!erpReferenceFilter) return true;
      return product.erpReference.includes(erpReferenceFilter);
    })
    .filter(product => {
      if (!languageFilter) return true;
      return product.availableLanguages?.includes(languageFilter) || false;
    })
    .filter(product => {
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
      case 'relevance':
      default:
        return 0; // maintain original order for relevance
    }
  });

  // Toggle subcategory filter - memoized for better performance
  const toggleSubcategoryFilter = useCallback((subcategory: string) => {
    setSubcategoryFilter(prev => 
      prev.includes(subcategory) 
        ? prev.filter(sc => sc !== subcategory) 
        : [...prev, subcategory]
    );
  }, []);

  // Toggle manufacturer filter - memoized for better performance
  const toggleManufacturerFilter = useCallback((manufacturer: string) => {
    setManufacturerFilter(prev => 
      prev.includes(manufacturer) 
        ? prev.filter(m => m !== manufacturer) 
        : [...prev, manufacturer]
    );
  }, []);

  // Toggle mobile filter
  const toggleMobileFilter = useCallback(() => {
    setMobileFilterOpen(prev => !prev);
  }, []);
  
  // Reset all filters - memoized for better performance
  const resetFilters = useCallback(() => {
    setSubcategoryFilter([]);
    setManufacturerFilter([]);
    setErpReferenceFilter(null);
    setLanguageFilter(null);
    setEnrichmentFilter(null);
  }, []);

  return (
    <>
<BreadcrumbNav 
  items={[
    { href: '/', label: 'Home' },
    { href: '/category', label: 'Categories' },
    { href: `/category/${params.id}`, label: categoryInfo?.name || 'Category' }
  ]} 
/>
      <div className="min-h-screen bg-gray-50 py-6 px-2 pb-32 relative overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          
          <MobileFilterToggle 
            mobileFilterOpen={mobileFilterOpen} 
            toggleMobileFilter={toggleMobileFilter} 
          />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar for Filtering - Using our new modular FilterSidebar */}
            <FilterSidebar 
              filterOptions={filterOptions}
              subcategoryFilter={subcategoryFilter}
              manufacturerFilter={manufacturerFilter}
              erpReferenceFilter={erpReferenceFilter}
              languageFilter={languageFilter}
              enrichmentFilter={enrichmentFilter}
              toggleSubcategoryFilter={toggleSubcategoryFilter}
              toggleManufacturerFilter={toggleManufacturerFilter}
              setErpReferenceFilter={setErpReferenceFilter}
              setLanguageFilter={setLanguageFilter}
              setEnrichmentFilter={setEnrichmentFilter}
              resetFilters={resetFilters}
              mobileFilterOpen={mobileFilterOpen}
            />
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Category Header */}
              <CategoryHeader 
  categoryName={categoryInfo?.name || 'Category'}
  description={categoryInfo?.description || 'No description available'} 
/>
              
              {/* Sorting and View Options */}
              <SortingBar 
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
                productCount={sortedProducts.length}
              />
              
              {/* Products Display */}
              <ProductGrid 
                products={sortedProducts} 
                viewMode={viewMode} 
                resetFilters={resetFilters} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
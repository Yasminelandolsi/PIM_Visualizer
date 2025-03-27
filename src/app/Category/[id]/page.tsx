'use client'
import React, { useState, useCallback } from 'react';
import BreadcrumbNav from "../../components/category/Breadcrumb";
import CategoryHeader from "../../components/category/CategoryHeader";
import SortingBar from "../../components/category/SortingBar";
import ProductGrid from "../../components/category/ProductGrid";
import MobileFilterToggle from "../../components/category/MobileFilterToggle";
import { Category, Product, FilterOptions } from '../../types/category.types';
import FilterSidebar from '../../components/category/filters/FilterSidebar';

const category: Category = { 
  name: "Industrial Tools", 
  description: "Professional tools for industrial applications",
  subcategories: ["Power Tools", "Hand Tools", "Measuring Instruments", "Safety Equipment", "Welding"]
};


// Industrial products for testing
const sampleProducts: Product[] = [
  {
    id: "t1",
    title: "Industrial Grade Drill Press",
    reference: "DRL-5500",
    erpReference: "C600-2214069",
    ean: "5901234123457",
    manufacturer: "PowerMaster",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Drill+Press",
    category: "industrial-tools",
    subcategory: "Power Tools",
    description: "Heavy-duty drill press with variable speed control and digital depth gauge.",
    enrichmentLevel: "Premium",
    availableLanguages: ["en", "fr", "de", "es"]
  },
  {
    id: "t2",
    title: "Professional Torque Wrench Set",
    reference: "TWS-220",
    erpReference: "B400-3365128",
    ean: "5901234123458",
    manufacturer: "PrecisionPro",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Torque+Wrench",
    category: "industrial-tools",
    subcategory: "Hand Tools",
    description: "High-precision torque wrench set with digital display and calibration certificate.",
    enrichmentLevel: "Premium",
    availableLanguages: ["en", "fr", "de"]
  },
  {
    id: "t3",
    title: "Laser Distance Meter",
    reference: "LDM-150",
    erpReference: "M200-1124567",
    ean: "5901234123459",
    manufacturer: "MeasureMax",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Distance+Meter",
    category: "industrial-tools",
    subcategory: "Measuring Instruments",
    description: "Advanced laser distance meter with 150m range and Bluetooth connectivity.",
    enrichmentLevel: "Standard",
    availableLanguages: ["en", "fr"]
  },
  {
    id: "t4",
    title: "Industrial Safety Helmet",
    reference: "SH-2000",
    erpReference: "S300-9987654",
    ean: "5901234123460",
    manufacturer: "SafeGuard",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Safety+Helmet",
    category: "industrial-tools",
    subcategory: "Safety Equipment",
    description: "Impact-resistant safety helmet with integrated face shield and ear protection.",
    enrichmentLevel: "Basic",
    availableLanguages: ["en"]
  },
  {
    id: "t5",
    title: "Professional MIG Welder",
    reference: "WLD-3500",
    erpReference: "W500-8876543",
    ean: "5901234123461",
    manufacturer: "WeldTech",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=MIG+Welder",
    category: "industrial-tools",
    subcategory: "Welding",
    description: "Professional-grade MIG welder with digital controls and gas/gasless capability.",
    enrichmentLevel: "LIS",
    availableLanguages: ["en", "fr", "de", "es", "it"]
  },
  {
    id: "t6",
    title: "Cordless Impact Wrench",
    reference: "IW-1200",
    erpReference: "C600-7766554",
    ean: "5901234123462",
    manufacturer: "PowerMaster",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Impact+Wrench",
    category: "industrial-tools",
    subcategory: "Power Tools",
    description: "Heavy-duty cordless impact wrench with 1200Nm torque and brushless motor.",
    enrichmentLevel: "Standard",
    availableLanguages: ["en", "fr"]
  }
];

// Extract filter options from products for the sidebar
const getFilterOptions = (products: Product[]): FilterOptions => {
  return {
    subcategories: [...new Set(products.map(p => p.subcategory || '').filter(Boolean))],
    manufacturers: [...new Set(products.map(p => p.manufacturer))],
    erpReferences: [...new Set(products.map(p => p.erpReference))],
    languages: [...new Set(products.flatMap(p => p.availableLanguages || []))],
    enrichmentLevels: [...new Set(products.map(p => p.enrichmentLevel || '').filter(Boolean))]
  };
};

const filterOptions = getFilterOptions(sampleProducts);

const CategoryPage: React.FC = () => {

  // State management with memoized callbacks for better performance
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [subcategoryFilter, setSubcategoryFilter] = useState<string[]>([]);
  const [manufacturerFilter, setManufacturerFilter] = useState<string[]>([]);
  const [erpReferenceFilter, setErpReferenceFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [enrichmentFilter, setEnrichmentFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('featured');



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
      <BreadcrumbNav />
      
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
                categoryName={category.name}
                description={category.description} 
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
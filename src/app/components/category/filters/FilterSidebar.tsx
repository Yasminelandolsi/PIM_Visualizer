'use client';
import React, { memo } from 'react';
import { FilterOptions } from '../../../types/category.types'; 

import CategoryFilter from './CategoryFilter';
import ManufacturerFilter from './ManufacturerFilter';
import ErpReferenceFilter from './ErpReferenceFilter';
import LanguageFilter from './LanguageFilter';
import EnrichmentLevelFilter from './EnrichmentLevelFilter';
import ClearFiltersButton from './ClearFiltersButton';

interface FilterSidebarProps {
  filterOptions: FilterOptions;
  subcategoryFilter: string[];
  manufacturerFilter: string[];
  erpReferenceFilter: string | null;
  languageFilter: string | null;
  enrichmentFilter: string | null;
  toggleSubcategoryFilter: (subcategory: string) => void;
  toggleManufacturerFilter: (manufacturer: string) => void;
  setErpReferenceFilter: (value: string | null) => void;
  setLanguageFilter: (value: string | null) => void;
  setEnrichmentFilter: (value: string | null) => void;
  resetFilters: () => void;
  mobileFilterOpen: boolean;
}

const FilterSidebar = memo<FilterSidebarProps>(({
  filterOptions,
  subcategoryFilter,
  manufacturerFilter,
  erpReferenceFilter,
  languageFilter,
  enrichmentFilter,
  toggleSubcategoryFilter,
  toggleManufacturerFilter,
  setErpReferenceFilter,
  setLanguageFilter,
  setEnrichmentFilter,
  resetFilters,
  mobileFilterOpen
}) => {
  return (
    <aside 
      className={`
        md:w-64 flex-shrink-0 
        ${mobileFilterOpen ? 'block' : 'hidden'} md:block
        bg-white rounded-lg shadow-md p-5 h-fit
      `}
      aria-label="Product filters"
    >
      <div className="sticky top-4">
        <h2 className="font-bold text-lg mb-4 text-gray-800 pb-2">Filter</h2>
        
        <CategoryFilter 
          subcategories={filterOptions.subcategories}
          selectedCategories={subcategoryFilter}
          toggleCategory={toggleSubcategoryFilter}
        />
        
        <ManufacturerFilter
          manufacturers={filterOptions.manufacturers}
          selectedManufacturers={manufacturerFilter}
          toggleManufacturer={toggleManufacturerFilter}
        />
        
        <ErpReferenceFilter
          selectedErpReference={erpReferenceFilter}
          setErpReference={setErpReferenceFilter}
        />
        
        <LanguageFilter
          selectedLanguage={languageFilter}
          setLanguage={setLanguageFilter}
        />
        
        <EnrichmentLevelFilter
          selectedEnrichmentLevel={enrichmentFilter}
          setEnrichmentLevel={setEnrichmentFilter}
        />
        
        <ClearFiltersButton onClick={resetFilters} />
      </div>
    </aside>
  );
});

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;
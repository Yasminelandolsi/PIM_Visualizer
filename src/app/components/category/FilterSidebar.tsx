import React, { useState } from 'react';
import { FilterOptions } from '../../types/category.types';

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

// Language mapping with codes and names
const languageCodeMap = {
  "fr": "French",
  "en": "English",
  "nl": "Dutch",
  "de": "German",
  "it": "Italian",
  "pl": "Polish",
  "es": "Spanish"
};

// ERP Reference options
const erpReferences = ["Orexad", "Biesheuvel", "Zitec", "Minetti"];

// Enrichment levels
const enrichmentLevels = ["LIS", "BAS", "OPT", "EXC"];

// Filter section style 
const filterSectionStyle = "mb-6 border border-[#dcdcdc] p-4";
const FilterSidebar: React.FC<FilterSidebarProps> = ({
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
  // Languages list
  const availableLanguages = Object.entries(languageCodeMap).map(([code, name]) => ({
    code,
    name
  }));
  
  // State for category search
  const [categorySearchTerm, setCategorySearchTerm] = useState<string>('');
  
  // Filter categories based on search term
  const filteredSubcategories = filterOptions.subcategories.filter(subcategory => 
    subcategory.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );
  
  // Handle ERP Reference selection (since we're still using single string filter)
  const handleErpReferenceChange = (erp: string) => {
    if (erpReferenceFilter === erp) {
      setErpReferenceFilter(null); // Deselect if already selected
    } else {
      setErpReferenceFilter(erp); // Select new option
    }
  };
  
  return (
    <aside className={`
      md:w-64 flex-shrink-0 
      ${mobileFilterOpen ? 'block' : 'hidden'} md:block
      bg-white rounded-lg shadow-md p-5 h-fit
    `}>
      <div className="sticky top-4">
        <h2 className="font-bold text-lg mb-4 text-gray-800  pb-2">Filter </h2>
        
        {/* Subcategory Filter - with border */}
        <div className={filterSectionStyle}>
          <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
          
          {/* Category search and list container */}
          <div className="flex flex-col">
            {/* Search input for categories */}
            <input
              type="text"
              placeholder="Search categories"
              value={categorySearchTerm}
              onChange={(e) => setCategorySearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            
            {/* Scrollable category list */}
            <div className="max-h-40 overflow-y-auto pr-2">
              <div className="space-y-2">
                {filteredSubcategories.length > 0 ? (
                  filteredSubcategories.map(subcategory => (
                    <div key={subcategory} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`subcategory-${subcategory.replace(/\s+/g, '-').toLowerCase()}`} 
                        checked={subcategoryFilter.includes(subcategory)}
                        onChange={() => toggleSubcategoryFilter(subcategory)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`subcategory-${subcategory.replace(/\s+/g, '-').toLowerCase()}`} 
                        className="ml-2 text-sm text-gray-700"
                      >
                        {subcategory}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">No matching categories</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Manufacturer Filter - with border */}
        <div className={filterSectionStyle}>
          <h3 className="font-semibold text-gray-700 mb-2">Manufacturer</h3>
          <div className="space-y-2">
            {filterOptions.manufacturers.map(manufacturer => (
              <div key={manufacturer} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`manufacturer-${manufacturer.replace(/\s+/g, '-').toLowerCase()}`}
                  checked={manufacturerFilter.includes(manufacturer)}
                  onChange={() => toggleManufacturerFilter(manufacturer)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label 
                  htmlFor={`manufacturer-${manufacturer.replace(/\s+/g, '-').toLowerCase()}`} 
                  className="ml-2 text-sm text-gray-700"
                >
                  {manufacturer}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* ERP Reference Filter - with border */}
        <div className={filterSectionStyle}>
          <h3 className="font-semibold text-gray-700 mb-2">ERP Reference</h3>
          <div className="space-y-2">
            {erpReferences.map(erp => (
              <div key={erp} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`erp-${erp.toLowerCase()}`}
                  checked={erpReferenceFilter === erp}
                  onChange={() => handleErpReferenceChange(erp)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label 
                  htmlFor={`erp-${erp.toLowerCase()}`} 
                  className="ml-2 text-sm text-gray-700"
                >
                  {erp}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Language Filter - with border */}
        <div className={filterSectionStyle}>
          <h3 className="font-semibold text-gray-700 mb-2">Available Language</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="language-all" 
                name="language"
                checked={!languageFilter}
                onChange={() => setLanguageFilter(null)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="language-all" className="ml-2 text-sm text-gray-700">
                All languages
              </label>
            </div>
            
            {/* Adding shadow to indicate scrollable content */}
            <div className="relative">
              {/* Scroll indicator top shadow */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
              
              {/* Scroll indicator bottom shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
              
              {/* Scrollable language options with visually forced scrollbar */}
              <div 
                className="max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2 bg-gray-50"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 #f7fafc' }}
              >
                {availableLanguages.map(lang => (
                  <div key={lang.code} className="flex items-center mt-1 mb-1">
                    <input 
                      type="radio" 
                      id={`language-${lang.code}`}
                      name="language"
                      checked={languageFilter === lang.code}
                      onChange={() => setLanguageFilter(lang.code)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={`language-${lang.code}`} className="ml-2 text-sm text-gray-700">
                      {lang.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Enrichment Level Filter - with border */}
        <div className={filterSectionStyle}>
          <h3 className="font-semibold text-gray-700 mb-2">Enrichment Level</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="enrichment-all" 
                name="enrichment"
                checked={!enrichmentFilter}
                onChange={() => setEnrichmentFilter(null)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="enrichment-all" className="ml-2 text-sm text-gray-700">
                All levels
              </label>
            </div>
            {enrichmentLevels.map(level => (
              <div key={level} className="flex items-center">
                <input 
                  type="radio" 
                  id={`enrichment-${level.toLowerCase()}`}
                  name="enrichment"
                  checked={enrichmentFilter === level}
                  onChange={() => setEnrichmentFilter(level)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={`enrichment-${level.toLowerCase()}`} className="ml-2 text-sm text-gray-700">
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Clear Filters Button */}
        <button 
          onClick={resetFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded text-sm transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
'use client';
import { useState, useEffect, memo } from 'react';
import FilterSection from './shared/FilterSection';
import CheckboxFilter from './shared/CheckboxFilter';

interface CategoryFilterProps {
  subcategories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

const CategoryFilter = ({ subcategories, selectedCategories, toggleCategory }: CategoryFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  const filteredSubcategories = subcategories.filter(subcategory => 
    subcategory.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  
  return (
    <FilterSection title="Category">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search categories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2
                   focus:outline-none focus:ring-2 focus:ring-[#041e50] focus:border-[#041e50]
                   transition-colors duration-200"
          aria-label="Search for categories"
        />
        
        <div className="max-h-40 overflow-y-auto pr-2">
          <div className="space-y-2">
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map(subcategory => {
                const id = `subcategory-${subcategory.replace(/\s+/g, '-').toLowerCase()}`;
                return (
                  <CheckboxFilter 
                    key={id}
                    id={id}
                    checked={selectedCategories.includes(subcategory)}
                    onChange={() => toggleCategory(subcategory)}
                    label={subcategory}
                  />
                );
              })
            ) : (
              <p className="text-sm text-gray-500 py-2">No matching categories</p>
            )}
          </div>
        </div>
      </div>
    </FilterSection>
  );
};

export default memo(CategoryFilter);
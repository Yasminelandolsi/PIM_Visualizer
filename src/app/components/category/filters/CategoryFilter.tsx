'use client';
import { useState, memo } from 'react';
import FilterSection from './shared/FilterSection';
import CheckboxFilter from './shared/CheckboxFilter';
import FilterSearch from './shared/FilterSearch';

interface CategoryFilterProps {
  subcategories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

const CategoryFilter = ({ subcategories, selectedCategories, toggleCategory }: CategoryFilterProps) => {
  const [filteredSubcategories, setFilteredSubcategories] = useState(subcategories);
  
  // Handle search using the FilterSearch component
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredSubcategories(subcategories);
      return;
    }
    
    const filtered = subcategories.filter(subcategory => 
      subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubcategories(filtered);
  };
  
  return (
    <FilterSection title="Category">
      <div className="flex flex-col">
        <FilterSearch 
          placeholder="Search categories"
          onSearch={handleSearch}
          className="mb-2"
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
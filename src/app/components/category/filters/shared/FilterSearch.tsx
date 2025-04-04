'use client';
import { useState, useEffect, memo } from 'react';

interface FilterSearchProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  className?: string;
  debounceTime?: number;
  initialValue?: string;
}

const FilterSearch = memo(({
  placeholder = "Search",
  onSearch,
  className = "",
  debounceTime = 300,
  initialValue = ""
}: FilterSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);
    
    return () => clearTimeout(timer);
  }, [searchTerm, debounceTime, onSearch]);
  
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={`w-full border border-gray-300 rounded px-3 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-[#041e50] focus:border-[#041e50]
               transition-colors duration-200 ${className}`}
      aria-label={placeholder}
    />
  );
});

FilterSearch.displayName = 'FilterSearch';

export default FilterSearch;
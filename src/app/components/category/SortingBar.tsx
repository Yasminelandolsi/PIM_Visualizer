import React, { memo } from 'react';

// Type definition for sort options
type SortOption = {
  value: string;
  label: string;
};

// Define sort options as a constant to avoid recreating on each render
const SORT_OPTIONS: SortOption[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
];

interface SortingBarProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  productCount: number;
}

// SVG components to avoid repetition
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const SortingBar: React.FC<SortingBarProps> = ({ 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy,
  productCount 
}) => {
  // Handle sort change with proper type safety
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  
  // View mode toggle handlers with keyboard support
  const toggleGridView = () => setViewMode('grid');
  const toggleListView = () => setViewMode('list');
  
  return (
    <div className="mb-6">
      {/* Sorting and View Options */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all">
        <div className="w-full sm:w-auto flex items-center">
          <label htmlFor="sort-select" className="text-sm text-gray-500 mr-2">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={handleSortChange}
            className="border-gray-300 rounded-md text-gray-700 text-sm focus:ring-[#041e50] focus:border-[#041e50] transition-colors"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">View:</span>
          <div className="flex rounded-md overflow-hidden border border-gray-200">
            <button 
              onClick={toggleGridView} 
              onKeyDown={(e) => e.key === 'Enter' && toggleGridView()}
              className={`p-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#041e50] text-white' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <GridIcon />
            </button>
            <button 
              onClick={toggleListView}
              onKeyDown={(e) => e.key === 'Enter' && toggleListView()} 
              className={`p-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[#041e50] text-white' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Count */}
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{productCount}</span> product{productCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default memo(SortingBar);
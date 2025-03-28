import { Search, Filter } from 'lucide-react';
import { FilterState, ViewMode } from './types/range.type';

interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showFilterPanel: boolean;
  toggleFilterPanel: () => void;
  activeFilters: FilterState;
}

const SearchFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  viewMode, 
  setViewMode,
  showFilterPanel,
  toggleFilterPanel,
  activeFilters
}: SearchFilterBarProps) => {
  // Count active filters
  const activeFilterCount = Object.values(activeFilters).reduce((acc, arr) => acc + arr.length, 0);
  
  return (
    <div className="p-3 border-b border-gray-100">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search box */}
        <div className="relative w-full sm:w-64 md:w-72 order-2 sm:order-1">
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 pl-8 text-sm"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={15} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* View toggle buttons */}
        <div className="flex space-x-1 order-1 sm:order-2">
          <button
            onClick={() => setViewMode('table')}
            className={`px-2 py-1 text-xs rounded-md ${viewMode === 'table' 
              ? 'bg-[#041e50] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-2 py-1 text-xs rounded-md ${viewMode === 'cards' 
              ? 'bg-[#041e50] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Cards
          </button>
        </div>
        
        {/* Filter button */}
        <div className="relative ml-auto order-3">
          <button 
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              showFilterPanel ? 'bg-[#041e50] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            onClick={toggleFilterPanel}
          >
            <Filter size={14} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className={`rounded-full w-4 h-4 flex items-center justify-center text-xs ${
                showFilterPanel ? 'bg-white text-[#041e50]' : 'bg-[#041e50] text-white'
              }`}>
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
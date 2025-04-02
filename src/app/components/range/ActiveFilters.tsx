import { X } from 'lucide-react';
import { FilterState } from '../../types/range.type';


interface ActiveFiltersProps {
  activeFilters: FilterState;
  handleFilterChange: (specKey: string, value: string, isChecked: boolean) => void;
  clearAllFilters: () => void;
}

const ActiveFilters = ({ 
  activeFilters, 
  handleFilterChange, 
  clearAllFilters 
}: ActiveFiltersProps) => {
  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);
  
  if (!hasActiveFilters) return null;
  
  return (
    <div className="p-2 flex flex-wrap gap-1.5">
      {Object.entries(activeFilters).map(([key, values]) => 
        values.map(value => (
          <div key={`${key}-${value}`} className="bg-[#041e50]/10 text-[#041e50] text-xs px-2 py-0.5 rounded-md flex items-center">
            <span>{key}: {value}</span>
            <button 
              onClick={() => handleFilterChange(key, value, false)}
              className="ml-1.5 hover:text-[#041e50]/70"
              aria-label={`Remove ${key} filter for ${value}`}
            >
              <X size={12} />
            </button>
          </div>
        ))
      )}
      
      <button
        onClick={clearAllFilters}
        className="text-xs px-2 py-0.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;
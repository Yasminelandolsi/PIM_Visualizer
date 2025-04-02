import { X } from 'lucide-react';
import { FilterState }  from '../../types/range.type';

interface FilterPanelProps {
  specificationKeys: string[];
  specValues: {[key: string]: string[]};
  activeFilters: FilterState;
  handleFilterChange: (specKey: string, value: string, isChecked: boolean) => void;
  closePanel: () => void;
  clearAllFilters: () => void;
}

const FilterPanel = ({ 
  specificationKeys, 
  specValues, 
  activeFilters, 
  handleFilterChange,
  closePanel,
  clearAllFilters
}: FilterPanelProps) => {
  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);
  
  return (
    <div className="p-3 border-b border-gray-100 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Filter by Specifications</h3>
        <button 
          onClick={closePanel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {specificationKeys.map(specKey => {
          const values = specValues[specKey] || [];
          if (values.length <= 1) return null;
          
          return (
            <div key={specKey} className="mb-2">
              <h4 className="text-xs font-medium mb-1">{specKey}</h4>
              <div className="max-h-28 overflow-y-auto pl-1 space-y-1 text-xs">
                {values.map(value => (
                  <label key={`${specKey}-${value}`} className="flex items-center space-x-1.5 hover:bg-white p-1 rounded">
                    <input 
                      type="checkbox"
                      checked={activeFilters[specKey]?.includes(value) || false}
                      onChange={(e) => handleFilterChange(specKey, value, e.target.checked)}
                      className="rounded h-3 w-3 text-[#041e50]"
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#041e50] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
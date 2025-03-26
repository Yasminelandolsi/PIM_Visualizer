import React from 'react';
import { FilterIcon } from 'lucide-react';

interface MobileFilterToggleProps {
  mobileFilterOpen: boolean;
  toggleMobileFilter: () => void;
}

const MobileFilterToggle: React.FC<MobileFilterToggleProps> = ({ 
  mobileFilterOpen, 
  toggleMobileFilter 
}) => {
  return (
    <div className="md:hidden mb-4">
      <button 
        onClick={toggleMobileFilter}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700"
      >
        <FilterIcon size={18} />
        {mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
      </button>
    </div>
  );
};

export default MobileFilterToggle;
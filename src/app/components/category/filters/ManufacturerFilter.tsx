import { memo, useState } from 'react';
import FilterSection from './shared/FilterSection';
import CheckboxFilter from './shared/CheckboxFilter';
import FilterSearch from './shared/FilterSearch';

interface ManufacturerFilterProps {
  manufacturers: string[];
  selectedManufacturers: string[];
  toggleManufacturer: (manufacturer: string) => void;
}

const ManufacturerFilter = ({ 
  manufacturers, 
  selectedManufacturers, 
  toggleManufacturer 
}: ManufacturerFilterProps) => {
  // State to track filtered manufacturers
  const [filteredManufacturers, setFilteredManufacturers] = useState(manufacturers);
  
  // Handle search input
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredManufacturers(manufacturers);
      return;
    }
    
    const filtered = manufacturers.filter(manufacturer => 
      manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredManufacturers(filtered);
  };

  return (
    <FilterSection title="Manufacturer">
      <div className="flex flex-col">
        {/* Add search input */}
        <FilterSearch 
          placeholder="Search manufacturers"
          onSearch={handleSearch}
          className="mb-2"
        />
        
        {/* Scrollable area for manufacturers list */}
        <div className="max-h-40 overflow-y-auto pr-2">
          <div className="space-y-2">
            {filteredManufacturers.length > 0 ? (
              filteredManufacturers.map(manufacturer => {
                const id = `manufacturer-${manufacturer.replace(/\s+/g, '-').toLowerCase()}`;
                return (
                  <CheckboxFilter 
                    key={id}
                    id={id}
                    checked={selectedManufacturers.includes(manufacturer)}
                    onChange={() => toggleManufacturer(manufacturer)}
                    label={manufacturer}
                  />
                );
              })
            ) : (
              <p className="text-sm text-gray-500 py-2">No matching manufacturers</p>
            )}
          </div>
        </div>
      </div>
    </FilterSection>
  );
};

export default memo(ManufacturerFilter);
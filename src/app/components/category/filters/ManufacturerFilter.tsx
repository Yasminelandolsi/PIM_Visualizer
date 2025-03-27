import { memo } from 'react';
import FilterSection from './shared/FilterSection';
import CheckboxFilter from './shared/CheckboxFilter';

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
  return (
    <FilterSection title="Manufacturer">
      <div className="space-y-2">
        {manufacturers.map(manufacturer => {
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
        })}
      </div>
    </FilterSection>
  );
};

export default memo(ManufacturerFilter);
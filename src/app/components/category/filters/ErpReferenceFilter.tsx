import { memo, useCallback, useState } from 'react';
import FilterSection from './shared/FilterSection';
import CheckboxFilter from './shared/CheckboxFilter';
import FilterSearch from './shared/FilterSearch';
import { ERP_REFERENCES } from './constants';

interface ErpReferenceFilterProps {
  selectedErpReference: string | null;
  setErpReference: (value: string | null) => void;
}

const ErpReferenceFilter = ({ 
  selectedErpReference, 
  setErpReference 
}: ErpReferenceFilterProps) => {
  // Add state for filtered ERP references
  const [filteredReferences, setFilteredReferences] = useState(ERP_REFERENCES);
  
  const handleErpReferenceChange = useCallback((erp: string) => {
    if (selectedErpReference === erp) {
      setErpReference(null);
    } else {
      setErpReference(erp);
    }
  }, [selectedErpReference, setErpReference]);
  
  // Add search handler for FilterSearch component
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredReferences(ERP_REFERENCES);
      return;
    }
    
    const filtered = ERP_REFERENCES.filter(reference => 
      reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReferences(filtered);
  };
  
  return (
    <FilterSection title="ERP Reference">
      <div className="space-y-2">
        {/* Add FilterSearch component */}
        <FilterSearch 
          placeholder="Search ERP references"
          onSearch={handleSearch}
          className="mb-2"
        />
        
        {/* Display filtered references or a message when no matches */}
        {filteredReferences.length > 0 ? (
          filteredReferences.map(erp => {
            const id = `erp-${erp.toLowerCase()}`;
            return (
              <CheckboxFilter 
                key={id}
                id={id}
                checked={selectedErpReference === erp}
                onChange={() => handleErpReferenceChange(erp)}
                label={erp}
              />
            );
          })
        ) : (
          <p className="text-sm text-gray-500 py-2">No matching ERP references</p>
        )}
      </div>
    </FilterSection>
  );
};

export default memo(ErpReferenceFilter);
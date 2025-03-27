import { memo, useCallback } from 'react';
import FilterSection from './shared/FilterSection';
import CheckboxFilter from './shared/CheckboxFilter';
import { ERP_REFERENCES } from './constants';

interface ErpReferenceFilterProps {
  selectedErpReference: string | null;
  setErpReference: (value: string | null) => void;
}

const ErpReferenceFilter = ({ 
  selectedErpReference, 
  setErpReference 
}: ErpReferenceFilterProps) => {
  
  const handleErpReferenceChange = useCallback((erp: string) => {
    if (selectedErpReference === erp) {
      setErpReference(null);
    } else {
      setErpReference(erp);
    }
  }, [selectedErpReference, setErpReference]);
  
  return (
    <FilterSection title="ERP Reference">
      <div className="space-y-2">
        {ERP_REFERENCES.map(erp => {
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
        })}
      </div>
    </FilterSection>
  );
};

export default memo(ErpReferenceFilter);
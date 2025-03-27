import { memo } from 'react';
import FilterSection from './shared/FilterSection';
import RadioFilter from './shared/RadioFilter';
import { ENRICHMENT_LEVELS } from './constants';

interface EnrichmentLevelFilterProps {
  selectedEnrichmentLevel: string | null;
  setEnrichmentLevel: (value: string | null) => void;
}

const EnrichmentLevelFilter = ({ 
  selectedEnrichmentLevel, 
  setEnrichmentLevel 
}: EnrichmentLevelFilterProps) => {
  return (
    <FilterSection title="Enrichment Level">
      <div className="space-y-2">
        <RadioFilter
          id="enrichment-all"
          name="enrichment"
          checked={!selectedEnrichmentLevel}
          onChange={() => setEnrichmentLevel(null)}
          label="All levels"
        />
        
        {ENRICHMENT_LEVELS.map(level => (
          <RadioFilter
            key={level}
            id={`enrichment-${level.toLowerCase()}`}
            name="enrichment"
            checked={selectedEnrichmentLevel === level}
            onChange={() => setEnrichmentLevel(level)}
            label={level}
          />
        ))}
      </div>
    </FilterSection>
  );
};

export default memo(EnrichmentLevelFilter);
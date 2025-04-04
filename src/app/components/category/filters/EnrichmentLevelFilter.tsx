'use client';
import { memo, useState } from 'react';
import FilterSection from './shared/FilterSection';
import RadioFilter from './shared/RadioFilter';
import FilterSearch from './shared/FilterSearch';
import { ENRICHMENT_LEVELS } from './constants';

interface EnrichmentLevelFilterProps {
  selectedEnrichmentLevel: string | null;
  setEnrichmentLevel: (value: string | null) => void;
}

const EnrichmentLevelFilter = ({ 
  selectedEnrichmentLevel, 
  setEnrichmentLevel 
}: EnrichmentLevelFilterProps) => {
  // State to track filtered enrichment levels
  const [filteredLevels, setFilteredLevels] = useState(ENRICHMENT_LEVELS);
  
  // Handle search input
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredLevels(ENRICHMENT_LEVELS);
      return;
    }
    
    const filtered = ENRICHMENT_LEVELS.filter(level => 
      level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLevels(filtered);
  };

  return (
    <FilterSection title="Enrichment Level">
      <div className="space-y-2">
        {/* Add FilterSearch component */}
        <FilterSearch 
          placeholder="Search enrichment levels"
          onSearch={handleSearch}
          className="mb-2"
        />
        
        {/* Always show the "All levels" option */}
        <RadioFilter
          id="enrichment-all"
          name="enrichment"
          checked={!selectedEnrichmentLevel}
          onChange={() => setEnrichmentLevel(null)}
          label="All levels"
        />
        
        {/* Display filtered enrichment levels */}
        {filteredLevels.length > 0 ? (
          filteredLevels.map(level => (
            <RadioFilter
              key={level}
              id={`enrichment-${level.toLowerCase()}`}
              name="enrichment"
              checked={selectedEnrichmentLevel === level}
              onChange={() => setEnrichmentLevel(level)}
              label={level}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 py-2">No matching enrichment levels</p>
        )}
      </div>
    </FilterSection>
  );
};

export default memo(EnrichmentLevelFilter);
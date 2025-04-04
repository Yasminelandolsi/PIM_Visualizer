import { memo, useMemo, useState } from 'react';
import FilterSection from './shared/FilterSection';
import RadioFilter from './shared/RadioFilter';
import FilterSearch from './shared/FilterSearch';
import { LANGUAGE_CODE_MAP } from './constants';

interface LanguageFilterProps {
  selectedLanguage: string | null;
  setLanguage: (value: string | null) => void;
}

const LanguageFilter = ({ 
  selectedLanguage, 
  setLanguage 
}: LanguageFilterProps) => {
  
  const allLanguages = useMemo(() => 
    Object.entries(LANGUAGE_CODE_MAP).map(([code, name]) => ({
      code,
      name
    })),
    []
  );
  
  // State for filtered languages
  const [filteredLanguages, setFilteredLanguages] = useState(allLanguages);
  
  // Handle search input
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredLanguages(allLanguages);
      return;
    }
    
    const filtered = allLanguages.filter(lang => 
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lang.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLanguages(filtered);
  };
  
  return (
    <FilterSection title="Available Language">
      <div className="space-y-2">
        {/* Add search input */}
        <FilterSearch 
          placeholder="Search languages"
          onSearch={handleSearch}
          className="mb-2"
        />
        
        {/* Shadow indicators for scrolling */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
          
          <div 
            className="max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2 bg-gray-50"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 #f7fafc' }}
          >
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map(lang => (
                <RadioFilter 
                  key={lang.code}
                  id={`language-${lang.code}`}
                  name="language"
                  checked={selectedLanguage === lang.code}
                  onChange={() => setLanguage(lang.code)}
                  label={lang.name}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 py-1">No matching languages</p>
            )}
          </div>
        </div>
      </div>
    </FilterSection>
  );
};

export default memo(LanguageFilter);
import { memo, useMemo } from 'react';
import FilterSection from './shared/FilterSection';
import RadioFilter from './shared/RadioFilter';
import { LANGUAGE_CODE_MAP } from './constants';

interface LanguageFilterProps {
  selectedLanguage: string | null;
  setLanguage: (value: string | null) => void;
}

const LanguageFilter = ({ 
  selectedLanguage, 
  setLanguage 
}: LanguageFilterProps) => {
  
  const availableLanguages = useMemo(() => 
    Object.entries(LANGUAGE_CODE_MAP).map(([code, name]) => ({
      code,
      name
    })),
    []
  );
  
  return (
    <FilterSection title="Available Language">
      <div className="space-y-2">
        <RadioFilter
          id="language-all"
          name="language"
          checked={!selectedLanguage}
          onChange={() => setLanguage(null)}
          label="All languages"
        />
        
        {/* Shadow indicators for scrolling */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
          
          <div 
            className="max-h-32 overflow-y-auto pr-2 border border-gray-200 rounded p-2 bg-gray-50"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 #f7fafc' }}
          >
            {availableLanguages.map(lang => (
              <RadioFilter 
                key={lang.code}
                id={`language-${lang.code}`}
                name="language"
                checked={selectedLanguage === lang.code}
                onChange={() => setLanguage(lang.code)}
                label={lang.name}
              />
            ))}
          </div>
        </div>
      </div>
    </FilterSection>
  );
};

export default memo(LanguageFilter);
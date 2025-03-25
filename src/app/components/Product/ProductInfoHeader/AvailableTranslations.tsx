import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";

interface Language {
  code: string;
  name: string;
  countryCode: string;
}

interface AvailableTranslationsProps {
  availableLanguages?: string[]; 
  onlyShowAvailable?: boolean; 
}

const ALL_SUPPORTED_LANGUAGES: Language[] = [
  { code: "fr", name: "Français", countryCode: "FR" },
  { code: "en", name: "English", countryCode: "GB" },
  { code: "nl", name: "Nederlands", countryCode: "NL" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "es", name: "Español", countryCode: "ES" },
  { code: "it", name: "Italiano", countryCode: "IT" },
  { code: "is", name: "Íslenska", countryCode: "IS" },     
  { code: "no", name: "Norsk", countryCode: "NO" },        
  { code: "fi", name: "Suomi", countryCode: "FI" },       
  { code: "da", name: "Dansk", countryCode: "DK" },        
  { code: "pl", name: "Polski", countryCode: "PL" },      
  { code: "sv", name: "Svenska", countryCode: "SE" }       
];

const AvailableTranslations: React.FC<AvailableTranslationsProps> = ({ 
  availableLanguages = [], 
  onlyShowAvailable = false 
}) => {
  const [supportedLanguages, setSupportedLanguages] = useState<Language[]>(ALL_SUPPORTED_LANGUAGES);
  
  // This useEffect simulates fetching languages from an API
  // Replace this with your actual API call when ready
  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      try {
        // Simulate API call
        // const response = await fetch('/api/supported-languages');
        // const data = await response.json();
        // setSupportedLanguages(data);
        
        // For now, we'll use the hardcoded list
        setSupportedLanguages(ALL_SUPPORTED_LANGUAGES);
      } catch (error) {
        console.error("Failed to fetch supported languages:", error);
        setSupportedLanguages(ALL_SUPPORTED_LANGUAGES);
      }
    };
    
    fetchSupportedLanguages();
  }, []); 

  const languagesToDisplay = onlyShowAvailable 
    ? supportedLanguages.filter(lang => 
        Array.isArray(availableLanguages) && availableLanguages.includes(lang.code)
      )
    : supportedLanguages;

  return (
    <div className="flex flex-wrap gap-3">
      {languagesToDisplay.map((language) => {
        const isAvailable = Array.isArray(availableLanguages) && availableLanguages.includes(language.code);
        
        return (
          <div key={language.code} className="flex flex-col items-center">
            <div className="mb-1 relative">
              <ReactCountryFlag
                countryCode={language.countryCode}
                svg
                style={{
                  width: '1.5rem',           
                  height: '1.125rem',        
                  borderRadius: '3px',      
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  opacity: isAvailable ? 1 : 0.7 
                }}
                title={language.name}
              />
              <span className="text-[8px] mt-1 text-center block">{language.code.toUpperCase()}</span>
            </div>
            
            {isAvailable ? (
              <CheckCircleIcon className="text-green-500" size={14} />
            ) : (
              <XCircleIcon className="text-gray-400" size={14} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AvailableTranslations;
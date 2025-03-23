import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

interface AvailableTranslationsProps {
  availableLanguages?: string[]; // array of language codes that are available (e.g. ["fr", "en", "es"])
}

// Define all supported languages with their country codes for flags
const supportedLanguages = [
  { code: "fr", name: "Français", countryCode: "FR" },
  { code: "en", name: "English", countryCode: "GB" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "es", name: "Español", countryCode: "ES" },
  { code: "it", name: "Italiano", countryCode: "IT" }
];

const AvailableTranslations: React.FC<AvailableTranslationsProps> = ({ availableLanguages = [] }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {supportedLanguages.map((language) => {
        const isAvailable = Array.isArray(availableLanguages) && availableLanguages.includes(language.code);
        
        return (
          <div key={language.code} className="flex flex-col items-center">
            <div className="mb-1">
              <ReactCountryFlag
                countryCode={language.countryCode}
                svg
                style={{
                  width: '2rem',
                  height: '1.5rem',
                  borderRadius: '4px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
                title={language.name}
              />
            </div>
            
            {isAvailable ? (
              <CheckCircleIcon className="text-green-500" size={16} />
            ) : (
              <XCircleIcon className="text-gray-400" size={16} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AvailableTranslations;
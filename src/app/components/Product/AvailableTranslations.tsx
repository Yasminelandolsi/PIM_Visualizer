// components/AvailableTranslations.tsx

interface AvailableTranslationsProps {
    translations: string[];
  }
  
  const flags: { [key: string]: string } = {
    fr: "🇫🇷",
    en: "🇬🇧",
    nl: "🇳🇱",
    de: "🇩🇪",
    it: "🇮🇹",
    es: "🇪🇸",
    no: "🇳🇴",
    fi: "🇫🇮",
    pl: "🇵🇱",
    sv: "🇸🇪",
    dk: "🇩🇰",
  };
  
  const AvailableTranslations: React.FC<AvailableTranslationsProps> = ({ translations }) => {
    return (
      <div className="grid grid-cols-5 gap-2 md:grid-cols-6 lg:grid-cols-8">
        {Object.entries(flags).map(([lang, flag]) => (
          <div key={lang} className="relative flex items-center">
            <span className="text-2xl">{flag}</span>
            {translations.includes(lang) ? (
              <span className="absolute -top-1 -right-1 text-green-500 text-sm">✔️</span>
            ) : (
              <span className="absolute -top-1 -right-1 text-gray-400 text-sm">❌</span>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default AvailableTranslations;
  
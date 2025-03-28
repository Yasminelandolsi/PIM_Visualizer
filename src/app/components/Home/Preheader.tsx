"use client";
import { useState } from "react";
import { Globe, Store, ChevronDown } from "lucide-react";

const Preheader: React.FC = () => {
  const [selectedWebshop, setSelectedWebshop] = useState<string>("OREXAD");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");

  return (
    <header className="w-full bg-gray-50 py-1 border-b border-gray-200 text-xs">
      <div className="flex items-center justify-end max-w-7xl mx-auto px-2">
        <div className="flex items-center space-x-4">
          {/* Webshop selector */}
          <div className="flex items-center space-x-1 relative">
            <Store size={14} className="text-[#041e50]" /> 
            <select
              className="appearance-none bg-transparent border-0 py-1 pl-1 pr-6 rounded-sm focus:outline-none cursor-pointer"
              value={selectedWebshop}
              onChange={(e) => setSelectedWebshop(e.target.value)}
              aria-label="Select webshop"
            >
              <option value="OREXAD">OREXAD</option>
              <option value="ZITEC">ZITEC</option>
              <option value="MINETTI">MINETTI</option>
              <option value="BIESHEUVEL">BIESHEUVEL</option>
            </select>
            <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
          
          {/* Divider */}
          <div className="h-4 border-l border-gray-300"></div>
          
          {/* Language selector */}
          <div className="flex items-center space-x-1 relative">
            <Globe size={14} className="text-[#041e50]" /> 
            <select
              className="appearance-none bg-transparent border-0 py-1 pl-1 pr-6 rounded-sm focus:outline-none cursor-pointer"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Select language"
            >
              <option value="EN">English</option>
              <option value="FR">Français</option>
            </select>
            <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Preheader;
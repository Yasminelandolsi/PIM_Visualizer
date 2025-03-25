"use client";
import { useState } from "react";

const Preheader: React.FC = () => {
  const [selectedWebshop, setSelectedWebshop] = useState<string>("OREXAD");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");

  return (
    <header className="w-full bg-white p-2 md:p-4 border-b border-gray-300">
      <div className="flex items-center justify-end max-w-7xl mx-auto">
        <div className="flex space-x-2 md:space-x-4">
          <select
            className="p-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedWebshop}
            onChange={(e) => setSelectedWebshop(e.target.value)}
          >
            <option value="OREXAD">OREXAD</option>
            <option value="ZITEC">ZITEC</option>
            <option value="MINETTI">MINETTI</option>
            <option value="BIESHEUVEL">BIESHEUVEL</option>
          </select>
          <select
            className="p-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Preheader;

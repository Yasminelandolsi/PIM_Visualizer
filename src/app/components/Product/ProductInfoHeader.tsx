import React from 'react';
import QualityControl from "./ProductInfoHeader/QualityControl";
import EnrichmentLevel from "./ProductInfoHeader/EnrichmentLevel";
import AvailableTranslations from "./ProductInfoHeader/AvailableTranslations";

interface ProductInfoHeaderProps {
  qualityVerified: boolean;
  enrichmentLevel: string;
  availableLanguages: string[];
  className?: string;
}

const ProductInfoHeader: React.FC<ProductInfoHeaderProps> = ({
  qualityVerified,
  enrichmentLevel,
  availableLanguages,
  className = ""
}) => {
  return (
    <div className={`p-4 border border-gray-200 rounded-lg shadow bg-white mb-6 ${className}`}>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* Quality Control */}
        <div className="flex-1 p-2 md:p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">QUALITY CHECK</h2>
          <QualityControl verified={qualityVerified} />
        </div>
        
        {/* Enrichment Level - borders only on md screens and up */}
        <div className="flex-1 p-2 md:p-4 border-t md:border-t-0 md:border-x border-gray-200">
          <h2 className="text-lg font-semibold mb-2 text-center">ENRICHMENT QUALITY</h2>
          <EnrichmentLevel level={enrichmentLevel} />
        </div>
        
        {/* Available Translations */}
        <div className="flex-1 p-2 md:p-4 border-t md:border-t-0">
          <h2 className="text-lg font-semibold mb-2 text-center">CONTENT TRANSLATION</h2>
          <AvailableTranslations availableLanguages={availableLanguages} />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoHeader;
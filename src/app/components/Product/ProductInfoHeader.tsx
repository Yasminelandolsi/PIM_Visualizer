import React, { memo } from 'react';
import QualityControl from "./ProductInfoHeader/QualityControl";
import EnrichmentLevel from "./ProductInfoHeader/EnrichmentLevel";
import AvailableTranslations from "./ProductInfoHeader/AvailableTranslations";

interface ProductInfoHeaderProps {
  qualityVerified: boolean;
  enrichmentLevel: string;
  availableLanguages: string[];
  className?: string;
}

/**
 * ProductInfoHeader displays product quality metrics and translation status
 */
const ProductInfoHeader: React.FC<ProductInfoHeaderProps> = ({
  qualityVerified,
  enrichmentLevel,
  availableLanguages,
  className = ""
}) => {
  return (
    <div 
      className={`p-4 border border-gray-200 rounded-lg shadow-md bg-white mb-6 ${className}`}
      role="region" 
      aria-label="Product information summary"
    >
      <div className="flex flex-col md:flex-row md:divide-x divide-[#041e50]/20 md:space-x-4 space-y-4 md:space-y-0">
        {/* Quality Control */}
        <InfoSection title="QUALITY CHECK" testId="quality-control-section">
          <QualityControl verified={qualityVerified} />
        </InfoSection>
        
        {/* Enrichment Level */}
        <InfoSection title="ENRICHMENT QUALITY" testId="enrichment-level-section">
          <EnrichmentLevel level={enrichmentLevel} />
        </InfoSection>
        
        {/* Available Translations */}
        <InfoSection title="CONTENT TRANSLATION" testId="translations-section">
          <AvailableTranslations availableLanguages={availableLanguages} />
        </InfoSection>
      </div>
    </div>
  );
};

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  testId?: string;
}

// Extract repeated section pattern into a separate component
const InfoSection: React.FC<InfoSectionProps> = ({ title, children, testId }) => (
  <div 
    className="flex-1 p-4"
    data-testid={testId}
  >
    <h2 className="text-lg font-semibold mb-3 text-center text-[#041e50]">
      {title}
    </h2>
    <div className="flex justify-center">
      {children}
    </div>
  </div>
);

// Add display name for better debugging
ProductInfoHeader.displayName = 'ProductInfoHeader';

export default memo(ProductInfoHeader);
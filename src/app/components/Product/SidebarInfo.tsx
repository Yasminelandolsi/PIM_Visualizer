import React from 'react';
import PdfGenerator from './PdfGenerator';

// Remove the unused interface since we're using DOM targeting instead
// of passing product data directly

interface SidebarInfoProps {
  children?: React.ReactNode;
  lastUpdated?: string;
}

const SidebarInfo: React.FC<SidebarInfoProps> = ({ 
  children, 
  lastUpdated = "March 15, 2025" 
}) => {
  return (
    <div className="w-full md:w-64 mt-4 md:mt-0">
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow">
        {children || (
          <div className="space-y-4">
        <PdfGenerator 
  buttonLabel="Generate PDF"
  productInfoSelector="#product-info-main"
/>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Last Updated</h3>
              <p className="text-sm text-gray-600">{lastUpdated}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarInfo;
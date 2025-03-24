import React from 'react';
import PdfGenerator from './PdfGenerator';
import AvailableSuppliers from './product_info/AvailableSuppliers';
import ProductRange from './product_info/ProductRange';
interface SidebarInfoProps {
  children?: React.ReactNode;
  productAvailability?: { supplier: string; erpReference?: string; countryCode?: string }[];
}

const SidebarInfo: React.FC<SidebarInfoProps> = ({ 
  children, 
  productAvailability = []
}) => {
  return (
    <div className="mt-4 md:mt-0">
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow">
        {children || (
          <div className="space-y-5">
            <PdfGenerator 
              buttonLabel="Generate PDF" 
              productInfoSelector="#product-info-main"
            />
          </div>
        )}
      </div>
      <AvailableSuppliers 
      productAvailability={productAvailability}
      className="mt-4"
    />
          <ProductRange className="mt-4" />

  </div>
  );
};

export default SidebarInfo;

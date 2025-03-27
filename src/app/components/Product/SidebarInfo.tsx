import React from 'react';
import PdfGenerator from './sidebar_product_info/PdfGenerator';
import AvailableSuppliers from './sidebar_product_info/AvailableSuppliers';
import ProductRange from './sidebar_product_info/ProductRange';

interface SidebarInfoProps {
  children?: React.ReactNode;
  productAvailability?: { supplier: string; erpReference?: string; countryCode?: string }[];
}

const SidebarInfo: React.FC<SidebarInfoProps> = ({ 
  children, 
  productAvailability = []
}) => {
  return (
    <div className="mt-4 md:mt-0 flex-1 flex flex-col">
  <div className="border border-gray-200 rounded-lg bg-white shadow overflow-hidden flex-1 flex flex-col">
        {children ? (
          <div>{children}</div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-200">
            {/* PDF Generator Section */}
            <div className="p-5">
              <PdfGenerator 
                buttonLabel="Generate PDF" 
                productInfoSelector="#product-info-main"
              />
            </div>
            
            {/* Available Suppliers Section */}
            <div className="p-5">
              <AvailableSuppliers 
                productAvailability={productAvailability}
              />
            </div>
            
            {/* Product Range Section */}
            <div className="p-5">
              <ProductRange />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarInfo;
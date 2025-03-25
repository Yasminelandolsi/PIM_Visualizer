import React from 'react';
import ReactCountryFlag from 'react-country-flag';

// Define a list of default suppliers that should always be shown
const DEFAULT_SUPPLIERS = [
  { name: "Orexad", countryCode: "FR" },
  { name: "Biesheuvel", countryCode: "NL" },
  { name: "Minetti", countryCode: "IT" },
  { name: "Zitec", countryCode: "DE" }
];

interface SupplierInfo {
  supplier: string;
  erpReference?: string;
  countryCode?: string;
}

interface AvailableSuppliersProps {
  productAvailability?: SupplierInfo[];
  className?: string;
}

const AvailableSuppliers: React.FC<AvailableSuppliersProps> = ({ 
  productAvailability = [],
  className = ""
}) => {
  // Create a map of supplier names to their data
  const supplierMap = new Map();
  
  // Add all data from productAvailability to the map
  productAvailability.forEach(item => {
    supplierMap.set(item.supplier, {
      erpReference: item.erpReference,
      countryCode: item.countryCode,
      isAvailable: true
    });
  });
  
  // Ensure all default suppliers are in the map
  DEFAULT_SUPPLIERS.forEach(defaultSupplier => {
    if (!supplierMap.has(defaultSupplier.name)) {
      supplierMap.set(defaultSupplier.name, {
        erpReference: undefined,
        countryCode: defaultSupplier.countryCode,
        isAvailable: false
      });
    }
  });
  
  // Convert map back to array for rendering
  const suppliersToDisplay = Array.from(supplierMap.entries()).map(
    ([supplierName, data]) => ({
      supplier: supplierName,
      erpReference: data.erpReference,
      countryCode: data.countryCode,
      isAvailable: data.isAvailable
    })
  );

  return (
    <div className={`mt-4 border border-gray-200 rounded-lg p-5 bg-white shadow ${className}`}>
<h2 className="text-xl font-semibold mb-4" style={{ color: '#041e50' }}>
  Available in other catalogs
</h2>
      
<div className="mt-2 grid grid-cols-1 gap-4">        {suppliersToDisplay.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            {/* Header with flag and supplier name */}
            <div className="flex items-center space-x-2 mb-2">
              {item.countryCode && (
                <ReactCountryFlag 
                  countryCode={item.countryCode} 
                  svg 
                  className="w-5 h-5" 
                />
              )}
              <p className={`font-bold text-lg ${!item.isAvailable && 'text-gray-400'}`}>
                {item.supplier}
              </p>
            </div>
            
            {/* ERP reference with improved alignment */}
            {item.isAvailable && item.erpReference ? (
              <div className="flex flex-col pl-2">
                <div className="text-gray-500 text-sm">ERP reference:</div>
                <div className="text-gray-700 font-medium break-all">
                  {item.erpReference}
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-sm italic pl-2">Product not mapped</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSuppliers;
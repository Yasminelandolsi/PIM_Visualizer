import React, { useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';

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

interface SupplierDisplayData extends SupplierInfo {
  isAvailable: boolean;
}

interface AvailableSuppliersProps {
  productAvailability?: SupplierInfo[];
  className?: string;
}

// Fix #1: Create the supplier card component without memo first, then wrap it
const SupplierCardBase = ({ supplierData }: { supplierData: SupplierDisplayData }) => {
  const { supplier, countryCode, erpReference, isAvailable } = supplierData;
  
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      {/* Header with flag and supplier name */}
      <div className="flex items-center space-x-2 mb-2">
        {countryCode && (
          <ReactCountryFlag 
            countryCode={countryCode} 
            svg 
            className="w-5 h-5" 
            title={countryCode}
            aria-label={`Flag of ${countryCode}`}
          />
        )}
        <p className={`font-bold text-lg ${!isAvailable && 'text-gray-400'}`}>
          {supplier}
        </p>
      </div>
      
      {/* ERP reference display */}
      {isAvailable && erpReference ? (
        <div className="flex flex-col pl-2">
          <div className="text-gray-500 text-sm">ERP reference:</div>
          <div className="text-gray-700 font-medium break-all">
            {erpReference}
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-sm italic pl-2">Product not mapped</p>
      )}
    </div>
  );
};

const SupplierCard = React.memo(SupplierCardBase);
SupplierCard.displayName = 'SupplierCard';

const AvailableSuppliersBase: React.FC<AvailableSuppliersProps> = ({ 
  productAvailability = [],
  className = ""
}) => {
  const suppliersToDisplay = useMemo(() => {
    const supplierMap = new Map<string, {
      erpReference?: string;
      countryCode?: string;
      isAvailable: boolean;
    }>();
    
    productAvailability.forEach(item => {
      supplierMap.set(item.supplier, {
        erpReference: item.erpReference,
        countryCode: item.countryCode,
        isAvailable: true
      });
    });
    
    DEFAULT_SUPPLIERS.forEach(defaultSupplier => {
      if (!supplierMap.has(defaultSupplier.name)) {
        supplierMap.set(defaultSupplier.name, {
          erpReference: undefined,
          countryCode: defaultSupplier.countryCode,
          isAvailable: false
        });
      }
    });
    
    return Array.from(supplierMap.entries()).map(
      ([supplierName, data]) => ({
        supplier: supplierName,
        erpReference: data.erpReference,
        countryCode: data.countryCode,
        isAvailable: data.isAvailable
      })
    );
  }, [productAvailability]);

  if (suppliersToDisplay.length === 0) {
    return null;
  }

  return (
    <div 
      className={`mt-4 border border-gray-200 rounded-lg p-5 bg-white shadow ${className}`}
      aria-labelledby="suppliers-heading"
    >
      <h2 
        id="suppliers-heading"
        className="text-xl font-semibold mb-4" 
        style={{ color: '#041e50' }}
      >
        Available in other catalogs
      </h2>
      
      <div 
        className="mt-2 grid grid-cols-1 gap-4"
        role="list"
        aria-label="Supplier availability"
      >        
        {suppliersToDisplay.map((item, index) => (
          <SupplierCard 
            key={`${item.supplier}-${index}`} 
            supplierData={item} 
          />
        ))}
      </div>
    </div>
  );
};

const AvailableSuppliers = React.memo(AvailableSuppliersBase);
AvailableSuppliers.displayName = 'AvailableSuppliers';

export default AvailableSuppliers;
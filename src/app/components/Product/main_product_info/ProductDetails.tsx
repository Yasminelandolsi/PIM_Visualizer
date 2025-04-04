import React, { memo, useMemo } from 'react';

interface ProductDetailsProps {
  name: string;
  description: string;
  reference: string;
  euReference: string;
  ean: string;
  mdmItemId: string;
  isMobile: boolean;
}

const DetailValue = memo(({ value }: { value: string }) => {
  return value ? <span className="font-bold">{value}</span> : <span className="text-gray-400">Not available</span>;
});

DetailValue.displayName = 'DetailValue';

const ProductDetails = memo(({ 
  name, 
  description, 
  reference, 
  euReference, 
  ean, 
  mdmItemId,
  isMobile
}: ProductDetailsProps) => {
  
  const details = useMemo(() => [
    { label: "Reference Dormer", value: reference },
    { label: "ERP Reference", value: euReference },
    { label: "EU Reference", value: euReference },
    { label: "EAN", value: ean },
    { label: "MDM Item ID", value: mdmItemId }
  ], [reference, euReference, ean, mdmItemId]);

  return (
    <div className="w-full md:w-1/2">
      {!isMobile && <h2 className="text-2xl font-semibold mb-4">{name}</h2>}
      <p className="text-gray-700 mb-4">{description}</p>
      
      <div className="grid grid-cols-1 gap-3 text-sm">
        {details.map(({ label, value }) => (
          <p key={label} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-2">
            <span className="font-medium text-gray-600">{label}:</span>{' '}
            <DetailValue value={value} />
          </p>
        ))}
      </div>
    </div>
  );
});

ProductDetails.displayName = "ProductDetails";

export default ProductDetails;

import React, { memo } from 'react';

interface ProductDetailsProps {
  name: string;
  description: string;
  reference: string;
  euReference: string;
  ean: string;
  mdmItemId: string;
  isMobile: boolean;
}

const ProductDetails = memo(({ 
  name, 
  description, 
  reference, 
  euReference, 
  ean, 
  mdmItemId,
  isMobile
}: ProductDetailsProps) => {
  const details = [
    { label: "Reference Dormer", value: reference },
    { label: "ERP Reference", value: euReference },
    { label: "EU Reference", value: euReference },
    { label: "EAN", value: ean },
    { label: "MDM Item ID", value: mdmItemId }
  ];

  return (
    <div className="w-full md:w-1/2">
      {!isMobile && <h2 className="text-2xl font-semibold mb-4">{name}</h2>}
      <p className="text-gray-700 mb-4">{description}</p>
      
      <div className="grid grid-cols-1 gap-3 text-sm">
        {details.map(({ label, value }) => (
          <p key={label}>
            <span className="font-medium text-gray-600">{label}:</span>{' '}
            <span className="font-bold">{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
});

ProductDetails.displayName = "ProductDetails";

export default ProductDetails;
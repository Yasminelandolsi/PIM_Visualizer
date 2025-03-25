import React, { memo } from 'react';

interface ProductDescriptionProps {
  description: string;
  fullDescription?: string;
}

const ProductDescription = memo(({ description, fullDescription }: ProductDescriptionProps) => (
  <div className="mb-6">
<h3 className="text-2xl font-bold mb-4" style={{ color: '#041e50' }}>Description</h3><p className="text-gray-700 mb-3 font-medium">{description}</p>
    
    {fullDescription && (
      <div className="text-gray-600 prose max-w-none">

        {/* Safe handling of HTML content with conditional rendering */}
        {fullDescription.includes('<') && fullDescription.includes('>') ? (
          <div dangerouslySetInnerHTML={{ 
            __html: fullDescription 
          
          }} />
        ) : (
          <p>{fullDescription}</p>
        )}
      </div>
    )}
  </div>
));

ProductDescription.displayName = 'ProductDescription';

export default ProductDescription;
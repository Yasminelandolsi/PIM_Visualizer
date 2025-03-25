import React from 'react';
import Link from 'next/link';

interface ProductRangeProps {
  className?: string;
  rangeId?: string;
  productCount?: number;
}

const ProductRange: React.FC<ProductRangeProps> = ({ 
  className, 
  rangeId = "default-range", 
  productCount = 2 
}) => {
  return (
    <div className={`border border-gray-200 rounded-lg p-5 bg-white shadow ${className}`}>
      <h2 className="text-xl font-semibold mb-4" style={{ color: '#041e50' }}>
        See all the products of the range
      </h2>
      
      <Link href={`/product-range/${rangeId}`} passHref>
        <button 
          className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-left shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => {
            // Removed unused 'e' parameter
            console.log(`Navigating to range: ${rangeId}`);
          }}
        >
          <div className="text-black font-medium">{productCount} products in the same range</div>
          <div className="text-gray-500 text-sm">with different characteristics</div>
        </button>
      </Link>
    </div>
  );
};

export default ProductRange;
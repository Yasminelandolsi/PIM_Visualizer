'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { productData } from '../../../mockData/productData';

interface RangeProduct {
  id: string;
  euRef: string;
  name: string;
  image: string;
}

interface ProductRangeProps {
  className?: string;
  currentProductId?: string;
}

const ProductRange = React.memo<ProductRangeProps>(({ 
  className = '', 
  currentProductId = productData.euReference
}) => {
  const { productRange } = productData;
  
  const href = useMemo(() => {
    const products = productRange.products as RangeProduct[];
    
    const foundProduct = products.find(p => p.euRef === currentProductId) || products[0];
    
    const params = new URLSearchParams({
      productId: currentProductId,
      productName: foundProduct.name,
      rangeId: productRange.rangeId
    }).toString();
    
    return `/product/range/${productRange.rangeId}?${params}`;
  }, [currentProductId, productRange]);

  return (
    <div className={`p-4 border border-gray-200 rounded-lg p-5 bg-white shadow ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-[#041e50]">
        See all the products of the range
      </h2>
      
      <Link 
        href={href}
        className="block w-full"
      >
        <div className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-left shadow-sm hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="text-black font-medium">{productRange.productCount} products in the same range</div>
          <div className="text-gray-500 text-sm">with different characteristics</div>
        </div>
      </Link>
    </div>
  );
});

ProductRange.displayName = 'ProductRange';

export default ProductRange;
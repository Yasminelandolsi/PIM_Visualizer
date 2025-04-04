'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';

interface ProductRangeProps {
  className?: string;
  currentProductId?: string;
  productRange?: {
    rangeId: string;
    productCount: number;
    products: Array<{
      id: string;
      euRef: string;
      name: string;
      image: string;
      specifications: Record<string, string>;
    }>;
  };
}

const ProductRange = React.memo<ProductRangeProps>(({ 
  className = '', 
  currentProductId = '',
  productRange
}) => {
  // IMPORTANT: Always define hooks at the top level, before any conditional returns
  const href = useMemo(() => {
    if (!productRange || !productRange.products || productRange.products.length === 0) {
      return '#';
    }
    
    const products = productRange.products;
    const foundProduct = products.find(p => p.euRef === currentProductId) || products[0];
    
    const params = new URLSearchParams({
      productId: currentProductId || '',
      productName: foundProduct ? foundProduct.name : 'Product',
      rangeId: productRange.rangeId
    }).toString();
    
    return `/product/range/${productRange.rangeId}?${params}`;
  }, [currentProductId, productRange]);

  // If no product range data provided, don't render anything
  if (!productRange || !productRange.products || productRange.products.length === 0) {
    return null;
  }

  return (
    <div className={`border border-gray-200 rounded-lg p-5 bg-white shadow ${className}`}>
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
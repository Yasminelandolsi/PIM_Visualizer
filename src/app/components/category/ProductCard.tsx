import React, { memo } from 'react';
import { Product } from '../../types/category.types';
import { Button } from "@mako/core";
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onViewDetails }) => {
  const { title, reference, manufacturer, image, ean, erpReference } = product;
  
  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(product);
  };
  
  if (viewMode === 'grid') {
    return (
      <div className="border border-[#dcdcdc] rounded-lg overflow-hidden shadow-sm bg-white transition-transform hover:scale-105">
        {/* Image container with Next.js Image component */}
        <div className="h-56 bg-gray-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image 
                src={image || '/placeholder-product.png'}
                alt={title || 'Product image'} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ 
                  objectFit: 'contain',
                  maxHeight: '12rem', // equivalent to max-h-48
                }}
                priority={false}
                quality={75}
                onError={() => {
                  // Next/Image handles most errors automatically
                  console.log(`Failed to load image for product: ${reference}`);
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-500">Ref: {reference || 'N/A'}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">{title || 'Untitled Product'}</h3>
          <div className="text-sm text-gray-600 mb-3">
            <p className="mb-1">Manufacturer: {manufacturer || 'N/A'}</p>
            <p className="mb-1">EAN: {ean || 'N/A'}</p>
            <p className="mb-1">ERP: {erpReference || 'N/A'}</p>
          </div>
          
          <Button
            shape="round"
            size="small"
            variant="primary"
            onClick={handleViewDetails}
            className="bg-[#041e50] text-white px-3 py-1 text-xs rounded hover:bg-[#0a2a6a] transition-colors w-full"
          >
            View Details
          </Button>
        </div>
      </div>
    );
  } 
  
  // List view
  return (
    <div className="flex flex-col sm:flex-row border border-[#dcdcdc] rounded-lg overflow-hidden shadow-sm bg-white mb-4 transition-transform hover:scale-[1.01]">
      {/* Image container with Next.js Image component */}
      <div className="sm:w-1/4 bg-gray-50 flex items-center justify-center p-3">
        <div className="relative w-full h-full min-h-[120px]">
          <Image 
            src={image || '/placeholder-product.png'} 
            alt={title || 'Product image'} 
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ 
              objectFit: 'contain',
              maxHeight: '8rem', // equivalent to max-h-32
            }}
            priority={false}
            quality={75}
          />
        </div>
      </div>
      <div className="p-4 sm:w-3/4 flex flex-col justify-between">
        <div>
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-500">Ref: {reference || 'N/A'}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">{title || 'Untitled Product'}</h3>
          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-1">Manufacturer: {manufacturer || 'N/A'}</p>
            <p className="mb-1">EAN: {ean || 'N/A'}</p>
            <p className="mb-1">ERP: {erpReference || 'N/A'}</p>
            {product.description && <p className="text-sm mt-2">{product.description}</p>}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button
            shape="round"
            size="small"
            variant="primary"
            onClick={handleViewDetails}
            className="bg-[#041e50] text-white px-3 py-1 text-xs rounded hover:bg-[#0a2a6a] transition-colors"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
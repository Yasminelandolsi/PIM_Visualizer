'use client'
import React, { useState, useEffect } from 'react';
import ProductImageCarousel from './main_product_info/ProductImageCarousel';
import ProductDetails from './main_product_info/ProductDetails';
import ProductDescription from './main_product_info/ProductDescription';
import TechnicalSheet from './main_product_info/TechnicalSheet';
import Specifications from './main_product_info/Specifications';

interface ProductDataProps {
  productData: {
    name: string;
    description: string;
    fullDescription: string;
    reference: string;
    euReference: string;
    ean: string;
    mdmItemId: string;
    images: string[];
    specifications: Array<{ label: string; value: string | number | boolean }>;
  };
}

const MainProductInfo: React.FC<ProductDataProps> = ({ productData }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div id="product-info-main" className="w-full flex flex-col">
      <div className="p-4 border border-gray-200 rounded-lg p-4 bg-white shadow flex-1">
        {isMobile && <h2 className="text-2xl font-semibold mb-4">{productData.name}</h2>}
        
        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
          <ProductImageCarousel 
            images={productData.images} 
            productName={productData.name} 
          />
          
          <ProductDetails 
            name={productData.name}
            description={productData.description}
            reference={productData.reference}
            euReference={productData.euReference}
            ean={productData.ean}
            mdmItemId={productData.mdmItemId}
            isMobile={isMobile}
          />
        </div>

        <ProductDescription 
          description={productData.description}
          fullDescription={productData.fullDescription}
        />
        
        <TechnicalSheet />
        <Specifications 
          specifications={productData.specifications}
        />
      </div>
    </div>
  );
};

export default MainProductInfo;
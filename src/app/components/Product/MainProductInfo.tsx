import React, { useEffect, useState } from 'react';
import ProductImageCarousel from './main_product_info/ProductImageCarousel ';
import ProductDetails from './main_product_info/ProductDetails';
import ProductDescription from './main_product_info/ProductDescription';
import TechnicalSheet from './main_product_info/TechnicalSheet';
import Specifications from './main_product_info/Specifications ';

interface Specification {
  label: string;
  value: string;
}

interface ProductData {
  name: string;
  description: string;
  fullDescription: string;
  reference: string;
  euReference: string;
  ean: string;
  mdmItemId: string;
  specifications: Specification[];
  images: string[];
}

const productData: ProductData = {
  name: "Hand-reamers B952",
  description: "HSS cylindrical hand drill Dormer B9521.2",
  fullDescription: "Hand-reamers B952 is a high-quality HSS cylindrical hand drill designed for precision work. Made with durable materials, this Dormer B9521.2 tool offers excellent performance for extended periods. Suitable for both professional and DIY applications.",
  reference: "B9521.2",
  euReference: "G1086004946",
  ean: "7320760140901",
  mdmItemId: "1229277",
  specifications: [
    { label: "Diameter", value: "1.2 mm" },
    { label: "Total length", value: "50 mm" },
    { label: "Length of cut", value: "32 mm" },
    { label: "Square", value: "2.4 mm" }
  ],
  images: [
    "/cylind.jpg",
    "/cylind1.jpg",
    "/cylind2.jpg",
  
  ]
};

const MainProductInfo: React.FC = () => {
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
    <div id="product-info-main" className="flex-grow pr-0 md:pr-2 mb-24 product-info-container">
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow overflow-visible">
        {isMobile && <h2 className="text-2xl font-semibold mb-4">{productData.name}</h2>}
        
        {/* Rest of component remains the same */}
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
         specifications={[
    { label: "Color", value: "Black" },
    { label: "Weight Capacity", value: "300 lbs" },
    { label: "Assembly Required", value: true }
  ]}
/>        </div>
    </div>
  );
};

export default MainProductInfo;
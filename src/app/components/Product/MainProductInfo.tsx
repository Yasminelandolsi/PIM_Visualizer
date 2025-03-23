import React, { useState } from 'react';
import Image from 'next/image';

interface MainProductInfoProps {
  children?: React.ReactNode;
}

const productData = {
  name: "Hand-reamers B952",
  description: "HSS cylindrical hand drill Dormer B9521.2",
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
    "/rubix.avif",
    "/rubix.avif",
    "/rubix.avif"
  ]
};

const MainProductInfo: React.FC<MainProductInfoProps> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  return (
    <div id="product-info-main" className="flex-grow pr-0 md:pr-4 mb-24 product-info-container">
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow overflow-visible">
        <h2 className="text-2xl font-semibold mb-4 md:hidden">{productData.name}</h2>
        
        {/* Image and Product Info - Side by Side on Desktop */}
        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
          {/* Image Carousel - Left Side */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative">
              {!imageError ? (
                <div 
                  className="relative h-64 md:h-80 w-full cursor-pointer" 
                  onClick={nextImage}
                >
                  <Image 
                    src={productData.images[currentImage]} 
                    alt={productData.name} 
                    fill
                    style={{ objectFit: "contain" }}
                    onError={() => setImageError(true)}
                    className="rounded-lg"
                  />
                  
                  {/* Navigation arrows */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="h-64 md:h-80 w-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
              
              {/* Thumbnails */}
              {productData.images.length > 1 && (
                <div className="flex space-x-2 mt-2 justify-center md:justify-start">
                  {productData.images.map((img, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentImage(index)} 
                      className={`w-12 h-12 border ${currentImage === index ? 'border-blue-500' : 'border-gray-300'} rounded`}
                    >
                      <div className="relative w-full h-full">
                        <Image 
                          src={img} 
                          alt={`Thumbnail ${index}`} 
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Product Info - Right Side */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 hidden md:block">{productData.name}</h2>
            <p className="text-gray-700 mb-4">{productData.description}</p>
            
            <div className="grid grid-cols-1 gap-3 text-sm">
              <p><span className="font-medium">Reference Dormer:</span> {productData.reference}</p>
              <p><span className="font-medium">EU Reference:</span> {productData.euReference}</p>
              <p><span className="font-medium">EAN:</span> {productData.ean}</p>
              <p><span className="font-medium">MDM Item ID:</span> {productData.mdmItemId}</p>
            </div>
          </div>
        </div>

        {/* Specifications Table - Full Width Below */}
        <div>
          <h3 className="text-lg font-medium mb-2">Specifications</h3>
          <table className="w-full text-sm">
            <tbody>
              {productData.specifications.map((spec, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 font-medium w-1/3">{spec.label}</td>
                  <td className="py-2">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default MainProductInfo;
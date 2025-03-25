import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images, productName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  // Helper variable to check if we have multiple images
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="w-full md:w-1/2 mb-4 md:mb-0">
      <div className="relative">
        {!imageError ? (
          <div 
            className={`relative h-64 md:h-80 w-full ${hasMultipleImages ? 'cursor-pointer' : ''}`}
            onClick={hasMultipleImages ? nextImage : undefined}
          >
            <Image 
              src={images[currentImage]} 
              alt={productName} 
              fill
              style={{ objectFit: "contain" }}
              onError={() => setImageError(true)}
              className="rounded-lg"
            />
            
            {/* Navigation arrows - only shown when multiple images exist */}
            {hasMultipleImages && (
              <>
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
              </>
            )}
          </div>
        ) : (
          <div className="h-64 md:h-80 w-full flex items-center justify-center bg-gray-100 rounded-lg">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
        
        {/* Thumbnails - already conditionally rendered */}
        {hasMultipleImages && (
          <div className="flex space-x-2 mt-2 justify-center md:justify-start">
            {images.map((img, index) => (
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
  );
};

export default ProductImageCarousel;
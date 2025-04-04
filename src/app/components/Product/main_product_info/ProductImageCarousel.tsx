'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import DialogModal from '@/app/components/Product/DialogModal';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
);

const Thumbnail = ({
  src,
  index,
  selected,
  onClick,
}: {
  src: string;
  index: number;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 md:w-16 md:h-16 border ${selected ? 'border-[#041e50]' : 'border-gray-300'} rounded`}
    aria-label={`Select image ${index + 1}`}
  >
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={`Thumbnail ${index}`}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded"
      />
    </div>
  </button>
);

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images, productName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasMultipleImages = images.length > 1;

  const nextImage = useCallback(() => {
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  }, [hasMultipleImages, images.length]);

  const prevImage = useCallback(() => {
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [hasMultipleImages, images.length]);

  const openImageDialog = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  }, []);

  return (
    <div className="w-full md:w-1/2 mb-4 md:mb-0">
      <div className="relative">
        {!imageError ? (
          <div className="relative h-64 md:h-80 w-full cursor-pointer" onClick={openImageDialog}>
            <Image
              src={images[currentImage]}
              alt={productName}
              fill
              onError={() => setImageError(true)}
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
            />

            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow transition-all"
                  aria-label="Previous image"
                >
                  <ArrowIcon direction="left" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow transition-all"
                  aria-label="Next image"
                >
                  <ArrowIcon direction="right" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="h-64 md:h-80 w-full flex items-center justify-center bg-gray-100 rounded-lg">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}

        {hasMultipleImages && (
          <div className="flex space-x-2 mt-2 justify-center md:justify-start">
            {images.map((img, index) => (
              <Thumbnail
                key={index}
                src={img}
                index={index}
                selected={currentImage === index}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        )}
      </div>

      <DialogModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={productName}
      >
        <div className="flex flex-col">
          <div className="relative h-[60vh] w-full">
            <Image
              src={images[currentImage]}
              alt={productName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              quality={90}
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />

            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-3 shadow transition-all"
                  aria-label="Previous image"
                >
                  <ArrowIcon direction="left" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-3 shadow transition-all"
                  aria-label="Next image"
                >
                  <ArrowIcon direction="right" />
                </button>
              </>
            )}
          </div>

          {hasMultipleImages && (
            <div className="flex space-x-2 mt-4 justify-center">
              {images.map((img, index) => (
                <Thumbnail
                  key={index}
                  src={img}
                  index={index}
                  selected={currentImage === index}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          )}
        </div>
      </DialogModal>
    </div>
  );
};

export default ProductImageCarousel;

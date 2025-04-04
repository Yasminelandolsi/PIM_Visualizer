import React from 'react';
import { Pagination } from '@mako/core';

interface ProductPaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
  className?: string;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  className = '',
}) => {
  
  return (
    <div className={`mt-6 ${className}`}>
      <Pagination
        total={totalItems}
        pageSize={pageSize}
        current={currentPage}
        onChange={onPageChange}
        itemRender={(page, type, element) => {
          if (type === 'page') {
            return (
              <button
                className={`min-w-[32px] h-[32px] flex items-center justify-center border rounded-md text-sm transition-all duration-200 ease-in-out ${
                  currentPage === page
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-gray-300 text-blue-600 hover:border-blue-600 hover:text-blue-600'
                }`}
                onClick={() => onPageChange(page, pageSize)}
              >
                {page}
              </button>
            );
          }

          if (type === 'prev' || type === 'next') {
            const isDisabled =
              (type === 'prev' && currentPage === 1) ||
              (type === 'next' && currentPage === Math.ceil(totalItems / pageSize));

            return (
              <button
                className={`min-w-[32px] h-[32px] flex items-center justify-center border rounded-md text-sm transition-all duration-200 ease-in-out ${
                  isDisabled
                    ? 'border-gray-300 text-gray-400 opacity-50 cursor-not-allowed'
                    : 'border-gray-300 text-blue-600 hover:border-blue-600 hover:text-blue-600'
                }`}
                onClick={() =>
                  !isDisabled &&
                  onPageChange(
                    type === 'prev' ? currentPage - 1 : currentPage + 1,
                    pageSize
                  )
                }
                disabled={isDisabled}
              >
                {type === 'prev' ? '<' : '>'}
              </button>
            );
          }

          if (type === 'jump-prev' || type === 'jump-next') {
            return <span className="text-gray-500">...</span>;
          }

          return element;
        }}
        className="flex justify-center items-center gap-2"
      />
    </div>
  );
};

export default ProductPagination;
import React, { memo } from 'react';
import { Button } from "@mako/core";

interface EmptyResultsProps {
  resetFilters: () => void;
  message?: string;
  buttonText?: string;
}

const EmptyResults: React.FC<EmptyResultsProps> = ({ 
  resetFilters, 
  message = "No products found matching your filters.",
  buttonText = "Clear Filters" 
}) => {
  return (
    <div className="bg-white rounded-lg p-8 text-center shadow-md flex flex-col items-center" role="alert">
      {/* Empty state icon */}
      <div className="mb-4 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No Results Found</h2>
      <p className="text-gray-500 mb-4">{message}</p>
      
      {/* Replaced standard button with Mako Button component */}
      <Button 
        shape="round"
        size="small"
        variant="primary"
        onClick={resetFilters}
        className="bg-[#041e50] text-white px-3 py-1 text-xs rounded hover:bg-[#0a2a6a] transition-colors mt-2"
        aria-label="Clear all applied filters"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default memo(EmptyResults);
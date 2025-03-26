import React, { memo } from "react";

interface CategoryHeaderProps {
  categoryName: string;
  description?: string;
}
const CategoryHeader: React.FC<CategoryHeaderProps> = ({ 
  categoryName, 
  description,  
}) => {
  return (
    <header className="mt-4 mb-8 border-b border-gray-200 pb-4">
      <div className="flex flex-wrap items-baseline justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#041e50]">
          {categoryName}
        </h1>
      </div>
      {description && (
        <p className="text-gray-600 mt-2 max-w-3xl">
          {description}
        </p>
      )}
    </header>
  );
};

export default memo(CategoryHeader);
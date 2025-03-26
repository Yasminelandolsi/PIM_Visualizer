import React from 'react';
import ProductCard from './ProductCard';
import EmptyResults from './EmptyResults';
import { Product } from '../../types/category.types';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  resetFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode, resetFilters }) => {
  if (products.length === 0) {
    return <EmptyResults resetFilters={resetFilters} />;
  }
  
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default ProductGrid;
import { memo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { RangeProduct } from '../../types/range.type';
import SpecCard from './SpecCard';

interface ProductCardProps {
  product: RangeProduct;
  specificationKeys: string[];
  expandedProduct: string | null;
  toggleProductExpansion: (id: string) => void;
}

const ProductCard = memo(({ 
  product, 
  specificationKeys,
  expandedProduct,
  toggleProductExpansion
}: ProductCardProps) => {
  const isExpanded = expandedProduct === product.euRef;
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Product header with image, name and reference */}
      <div className="p-3 flex items-start space-x-3 border-b border-gray-100">
        <div className="h-12 w-12 flex-shrink-0">
          <img className="h-12 w-12 object-cover rounded" src={product.image} alt={product.name} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{product.name}</p>
          <Link href={`/Product/${product.euRef}`} className="text-[#041e50] hover:underline text-xs font-medium">
            {product.euRef}
          </Link>
        </div>
        <button 
          onClick={() => toggleProductExpansion(product.euRef)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>
      
      {/* Specifications section */}
      <div className="p-3">
        {/* First show a summary (always visible) */}
        <div className="grid grid-cols-2 gap-2">
          {specificationKeys.slice(0, 2).map(key => (
            <div key={`${product.euRef}-${key}-summary`} className="text-xs">
              <span className="text-gray-500">{key}:</span> {product.specifications[key] || '—'}
            </div>
          ))}
        </div>
        
        {/* Then show the detailed cards when expanded */}
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {specificationKeys.map(key => (
              <SpecCard 
                key={`${product.euRef}-${key}-card`} 
                label={key} 
                value={product.specifications[key]} 
              />
            ))}
          </div>
        )}
        
        {/* Button to view full product */}
        <div className={`${isExpanded ? 'mt-3 pt-3 border-t' : 'mt-2'} border-gray-100`}>
          <Link 
            href={`/Product/${product.euRef}`}
            className="text-sm text-[#041e50] hover:underline flex items-center justify-center"
          >
            View Product Details <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
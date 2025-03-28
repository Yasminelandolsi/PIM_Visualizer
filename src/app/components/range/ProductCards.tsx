import { RangeProduct } from './types/range.type';
import ProductCard from './ProductCard';

interface ProductCardsProps {
  products: RangeProduct[];
  specificationKeys: string[];
  expandedProduct: string | null;
  toggleProductExpansion: (id: string) => void;
}

const ProductCards = ({
  products,
  specificationKeys,
  expandedProduct,
  toggleProductExpansion
}: ProductCardsProps) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard 
          key={product.euRef}
          product={product}
          specificationKeys={specificationKeys}
          expandedProduct={expandedProduct}
          toggleProductExpansion={toggleProductExpansion}
        />
      ))}
    </div>
  );
};

export default ProductCards;
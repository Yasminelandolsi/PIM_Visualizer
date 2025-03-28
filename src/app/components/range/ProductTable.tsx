import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RangeProduct, SortDirection }   from './types/range.type';

interface ProductTableProps {
  products: RangeProduct[];
  specificationKeys: string[];
  sortField: string;
  sortDirection: SortDirection;
  handleSort: (field: string) => void;
}

const ProductTable = ({
  products,
  specificationKeys,
  sortField,
  sortDirection,
  handleSort
}: ProductTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Product</span>
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                )}
              </div>
            </th>
            
            <th 
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('euRef')}
            >
              <div className="flex items-center space-x-1">
                <span>Reference</span>
                {sortField === 'euRef' && (
                  sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                )}
              </div>
            </th>
            
            {specificationKeys.map(specKey => (
              <th 
                key={specKey}
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                onClick={() => handleSort(specKey)}
              >
                <div className="flex items-center space-x-1">
                  <span>{specKey}</span>
                  {sortField === specKey && (
                    sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.euRef} className="hover:bg-gray-50">
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 flex-shrink-0">
                    <img className="h-8 w-8 object-cover" src={product.image} alt={product.name} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </div>
              </td>
              
              <td className="px-3 py-2 whitespace-nowrap">
                <Link href={`/Product/${product.euRef}`} className="text-[#041e50] hover:underline font-medium text-sm">
                  {product.euRef}
                </Link>
              </td>
              
              {specificationKeys.map(specKey => (
                <td key={`${product.euRef}-${specKey}`} className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                  {product.specifications[specKey] || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
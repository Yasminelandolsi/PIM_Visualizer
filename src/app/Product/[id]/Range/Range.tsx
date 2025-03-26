'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Define types for our product data
interface ProductSpecification {
  name: string;
  value: string | number | boolean;
}

interface RangeProduct {
  id: string;
  name: string;
  reference: string;
  image?: string;
  specifications: ProductSpecification[];
}

export default function RangePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rangeId = params.rangeId as string;
  
  // Get current product info from URL params
  const currentProductId = searchParams.get('productId') || '';
  const currentProductName = searchParams.get('productName') || '';
  const currentProductImage = searchParams.get('productImage') || '';
  
  const [products, setProducts] = useState<RangeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch products in this range
  useEffect(() => {
    const fetchRangeProducts = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/product-ranges/${rangeId}`);
        
        // For demo, let's use mock data
        setTimeout(() => {
          // Sample data - replace with your actual data structure
          const mockProducts: RangeProduct[] = [
            {
              id: currentProductId || 'product-1',
              name: currentProductName || 'Current Product',
              reference: 'REF-001',
              image: currentProductImage || '/placeholder.jpg',
              specifications: [
                { name: 'Weight', value: '2.5 kg' },
                { name: 'Material', value: 'Steel' },
                { name: 'Dimensions', value: '10 x 15 x 5 cm' }
              ]
            },
            {
              id: 'product-2',
              name: 'Similar Product A',
              reference: 'REF-002',
              specifications: [
                { name: 'Weight', value: '3.0 kg' },
                { name: 'Material', value: 'Steel' },
                { name: 'Dimensions', value: '12 x 15 x 5 cm' }
              ]
            },
            {
              id: 'product-3',
              name: 'Similar Product B',
              reference: 'REF-003',
              specifications: [
                { name: 'Weight', value: '1.8 kg' },
                { name: 'Material', value: 'Aluminum' },
                { name: 'Dimensions', value: '10 x 15 x 5 cm' }
              ]
            }
          ];
          
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(`Failed to load product range data: ${errorMessage}`);
        setLoading(false);
      }
    };
    
    fetchRangeProducts();
  }, [rangeId, currentProductId, currentProductName, currentProductImage]);
  
  // Get all unique specification names
  const allSpecNames = Array.from(
    new Set(
      products.flatMap(product => 
        product.specifications.map(spec => spec.name)
      )
    )
  );
  
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      {/* Header with navigation */}
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Product
        </Link>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#041e50' }}>
          Product Range: {rangeId}
        </h1>
      </div>
      
      {/* Current product info */}
      <div className="mb-8 bg-white shadow rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row">
          {currentProductImage && (
            <div className="md:w-1/3 mb-4 md:mb-0">
              <div className="relative h-64 w-full">
                <Image 
                  src={currentProductImage} 
                  alt={currentProductName}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          )}
          <div className="md:w-2/3 md:pl-6">
            <h2 className="text-2xl font-bold mb-4">{currentProductName}</h2>
            <p className="text-gray-700">
              Compare this product with others in the same range to find the best option for your needs.
            </p>
          </div>
        </div>
      </div>
      
      {/* Products comparison table - Now using allSpecNames */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              {/* Use allSpecNames here for dynamic table headers */}
              {allSpecNames.map(specName => (
                <th 
                  key={specName}
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {specName}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr 
                key={product.id}
                className={product.id === currentProductId ? "bg-blue-50" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.image && (
                      <div className="flex-shrink-0 h-10 w-10 mr-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      {product.id === currentProductId && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.reference}
                </td>
                {/* Use allSpecNames to map through each spec for this product */}
                {allSpecNames.map(specName => {
                  const spec = product.specifications.find(s => s.name === specName);
                  return (
                    <td key={`${product.id}-${specName}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {spec ? String(spec.value) : "-"}
                    </td>
                  );
                })}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/product/${product.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
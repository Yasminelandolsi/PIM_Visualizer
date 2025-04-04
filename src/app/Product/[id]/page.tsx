'use client'
import { useProductDetail } from '../../custom_hooks/useProductDetail';
import BreadcrumbNav from '../../components/Breadcrumb';
import ProductInfoHeader from '../../components/Product/ProductInfoHeader';
import MainProductInfo from '../../components/Product/MainProductInfo';
import SidebarInfo from '../../components/Product/SidebarInfo';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import EmptyResults from '../../components/EmptyResults';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { product, isLoading } = useProductDetail(params.id);
  const router = useRouter();

  if (isLoading || !product) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-2">
        <div className="max-w-6xl mx-auto pt-10">
          <EmptyResults
            resetFilters={() => router.push('/')}
            message={`Product with ID "${params.id}" could not be found. It may have been removed or the ID is incorrect.`}
            buttonText="Return to Home"
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <BreadcrumbNav product={product} />

      <div className="min-h-screen bg-gray-100 py-6 px-2 pb-32 relative overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <ProductInfoHeader 
            qualityVerified={product.qualityVerified}
            enrichmentLevel={product.enrichmentLevel}
            availableLanguages={product.availableLanguages}
          />
          
          {/* Main content area */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-4">
            {/* Main product info */}
            <div className="md:w-3/5 lg:w-2/3 flex">
              <MainProductInfo productData={product} />
            </div>
  
            {/* Sidebar - pass the full product */}
            <div className="md:w-2/5 lg:w-1/3 flex">
              <SidebarInfo 
                productAvailability={product.availability}
                product={product} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
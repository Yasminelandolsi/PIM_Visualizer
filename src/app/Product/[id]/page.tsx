'use client'
import MainProductInfo from "../../components/Product/MainProductInfo";
import SidebarInfo from "../../components/Product/SidebarInfo";
import BreadcrumbNav from "../../components/Product/Breadcrumb";
import ProductInfoHeader from "../../components/Product/ProductInfoHeader";
import { productData } from "../../mockData/productData";

const ProductPage = () => {
  return (
    <>
      <BreadcrumbNav />

      <div className="min-h-screen bg-gray-100 py-6 px-2 pb-32 relative overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <ProductInfoHeader 
            qualityVerified={productData.qualityVerified}
            enrichmentLevel={productData.enrichmentLevel}
            availableLanguages={productData.availableLanguages}
          />
          
          {/* Equal height container */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-4">
            {/* Main content */}
            <div className="md:w-3/5 lg:w-2/3 flex">
              <MainProductInfo productData={productData} />
            </div>
  
            {/* Sidebar */}
            <div className="md:w-2/5 lg:w-1/3 flex">
              <SidebarInfo 
                productAvailability={productData.availability}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
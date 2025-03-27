'use client'

import MainProductInfo from "../../components/Product/MainProductInfo";
import SidebarInfo from "../../components/Product/SidebarInfo";
import BreadcrumbNav from "../../components/Product/Breadcrumb";
import ProductInfoHeader from "../../components/Product/ProductInfoHeader";

const ProductPage = () => {
  const product = {
    qualityVerified: false,
    enrichmentLevel: "LIS",
    translations: ["fr", "en", "nl", "de", "es"],
  };

  return (
    <>
      <BreadcrumbNav />

      <div className="min-h-screen bg-gray-100 py-6 px-2 pb-32 relative overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <ProductInfoHeader 
            qualityVerified={product.qualityVerified}
            enrichmentLevel={product.enrichmentLevel}
            availableLanguages={product.translations}
          />
          
          {/* Equal height container */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-4">
            {/* Main content */}
            <div className="md:w-3/5 lg:w-2/3 flex">
              <MainProductInfo />
            </div>
  
            {/* Sidebar */}
            <div className="md:w-2/5 lg:w-1/3 flex">
              <SidebarInfo 
                productAvailability={[
                  { supplier: "Orexad", erpReference: "C600-2214069", countryCode: "FR" },
                  { supplier: "Biesheuvel", erpReference: "06850194", countryCode: "NL" },
                  { supplier: "Zitec", erpReference: "3234987", countryCode: "DE" }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
'use client'
import QualityControl from "../components/Product/QualityControl";
import EnrichmentLevel from "../components/Product/EnrichmentLevel";
import AvailableTranslations from "../components/Product/AvailableTranslations";
import MainProductInfo from "../components/Product/MainProductInfo";
import SidebarInfo from "../components/Product/SidebarInfo";
import BreadcrumbNav from "../components/Product/Breadcrumb";


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
       
          <div className="p-4 border border-gray-200 rounded-lg shadow bg-white mb-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">

              {/* Quality Control */}
              <div className="flex-1 p-2 md:p-4">
                <h2 className="text-lg font-semibold mb-2">QUALITY CHECK</h2>
                <QualityControl verified={product.qualityVerified} />
              </div>
              
              {/* Enrichment Level - borders only on md screens and up */}
              <div className="flex-1 p-2 md:p-4 border-t md:border-t-0 md:border-x border-gray-200">
                <h2 className="text-lg font-semibold mb-2">ENRICHMENT QUALITY</h2>
                <EnrichmentLevel level={product.enrichmentLevel} />
              </div>
              
              {/* Available Translations */}
              <div className="flex-1 p-2 md:p-4 border-t md:border-t-0">
                <h2 className="text-lg font-semibold mb-2">CONTENT TRANSLATION</h2>
                <AvailableTranslations availableLanguages={product.translations} />
              </div>
            </div>
          </div>
          
          {/* Main content and sidebar section */}
          <div className="flex flex-col md:flex-row md:items-start">
  {/* MainProductInfo with reduced width on larger screens */}
  <div className="md:w-3/5 lg:w-2/3">
    <MainProductInfo />
  </div>
  
  {/* SidebarInfo with increased width on larger screens */}
  <div className="md:w-2/5 lg:w-1/3 md:pl-4">
    <SidebarInfo 
      productAvailability={[
        { supplier: "Orexad", erpReference: "C600-2214069", countryCode: "FR" },
        { supplier: "Biesheuvel", erpReference: "06850194", countryCode: "NL" },
        { supplier: "Minetti", erpReference: "170000000538294", countryCode: "IT" },
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
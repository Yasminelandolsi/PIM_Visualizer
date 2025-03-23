'use client'
import QualityControl from "../components/Product/QualityControl";
import EnrichmentLevel from "../components/Product/EnrichmentLevel";
import AvailableTranslations from "../components/Product/AvailableTranslations";
import MainProductInfo from "../components/Product/MainProductInfo";
import SidebarInfo from "../components/Product/SidebarInfo";
import {Breadcrumb} from "@mako/core";

const ProductPage = () => {
  const product = {
    qualityVerified: false,
    enrichmentLevel: "LIS",
    translations: ["fr", "en", "nl", "de", "es"],
  };

  return (
    <>
      {/* Breadcrumb with same centering and max-width as content */}
      <div className="px-2">
        <div className="max-w-6xl mx-auto py-4">
          <Breadcrumb
            items={[
              {
                href: '/',
                label: 'Home'
              },
              {
                href: '/Category',
                label: 'Category'
              },
              {
                href: '/Product/id',
                label: 'Product_id'
              }
            ]}
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 py-6 px-2 pb-32 relative overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Current product status section */}
          <div className="p-4 border border-gray-200 rounded-lg shadow bg-white mb-6">
            {/* Responsive flex container - column on mobile, row on md screens and up */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              {/* Quality Control */}
              <div className="flex-1 p-2 md:p-4">
                <h2 className="text-lg font-semibold mb-2">Contrôle Qualité</h2>
                <QualityControl verified={product.qualityVerified} />
              </div>
              
              {/* Enrichment Level - borders only on md screens and up */}
              <div className="flex-1 p-2 md:p-4 border-t md:border-t-0 md:border-x border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Niveau Enrichissement</h2>
                <EnrichmentLevel level={product.enrichmentLevel} />
              </div>
              
              {/* Available Translations */}
              <div className="flex-1 p-2 md:p-4 border-t md:border-t-0">
                <h2 className="text-lg font-semibold mb-2">Traductions Disponibles</h2>
                <AvailableTranslations availableLanguages={product.translations} />
              </div>
            </div>
          </div>
          
          {/* Main content and sidebar section */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <MainProductInfo />
            <SidebarInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
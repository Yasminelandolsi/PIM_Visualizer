'use client'
import QualityControl from "../components/Product/QualityControl";
import EnrichmentLevel from "../components/Product/EnrichmentLevel";
import AvailableTranslations from "../components/Product/AvailableTranslations";

const ProductPage = () => {
  const product = {
    qualityVerified: true,
    enrichmentLevel: "EXC",
    translations: ["fr", "en", "nl", "de", "es"],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto p-4 border border-gray-200 rounded-lg shadow bg-white">
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
            <AvailableTranslations translations={product.translations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
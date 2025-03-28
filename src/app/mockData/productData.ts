export const productData = {
    name: "Hand-reamers B952",
    description: "HSS cylindrical hand drill Dormer B9521.2",
    fullDescription: "Hand-reamers B952 is a high-quality HSS cylindrical hand drill designed for precision work. Made with durable materials, this Dormer B9521.2 tool offers excellent performance for extended periods. Suitable for both professional and DIY applications.",
    
    reference: "B9521.2",
    euReference: "G1086004946",
    ean: "7320760140901",
    mdmItemId: "1229277",
    
    qualityVerified: false,
    enrichmentLevel: "LIS",
    availableLanguages: ["fr", "en", "nl", "de", "es"],
    
    images: [
      "/cylind.jpg",
      "/cylind1.jpg",
      "/cylind2.jpg",
    ],
    
    specifications: [
      { label: "Diameter", value: "1.2 mm" },
      { label: "Total length", value: "50 mm" },
      { label: "Length of cut", value: "32 mm" },
      { label: "Square", value: "2.4 mm" },
      { label: "Color", value: "Silver" },
      { label: "Material", value: "HSS" },
      { label: "Weight", value: "0.025 kg" }
    ],
    
    availability: [
      { supplier: "Orexad", erpReference: "C600-2214069", countryCode: "FR" },
      { supplier: "Biesheuvel", erpReference: "06850194", countryCode: "NL" },
      { supplier: "Zitec", erpReference: "3234987", countryCode: "DE" }
    ],
    
    productRange: {
        rangeId: "B952-series",
        productCount: 8,
        products: [
            {
                id: "B9521.2",
                euRef: "G1086004946",
                name: "Hand-reamers B952 1.2mm",
                image: "/cylind.jpg",
                specifications: {
                  "Diameter": "1.2 mm",
                  "Total length": "50 mm",
                  "Length of cut": "32 mm",
                  "Square": "2.4 mm",
                  "Material": "HSS",
                  "Weight": "0.025 kg"
                }
              },
              {
                id: "B9521.5", 
                euRef: "G1086004947",
                name: "Hand-reamers B952 1.5mm",
                image: "/cylind1.jpg",
                specifications: {
                  "Diameter": "1.5 mm",
                  "Total length": "54 mm",
                  "Length of cut": "34 mm",
                  "Square": "2.9 mm",
                  "Material": "HSS",
                  "Weight": "0.030 kg"
                }
              },
              {
                id: "B9522.0",
                euRef: "G1086004948",
                name: "Hand-reamers B952 2.0mm",
                image: "/cylind2.jpg",
                specifications: {
                  "Diameter": "2.0 mm",
                  "Total length": "60 mm",
                  "Length of cut": "36 mm",
                  "Square": "3.2 mm",
                  "Material": "HSS+TiN", // Note this product has a different material
                  "Weight": "0.035 kg"
                }
      },]},

    category: "Cutting Tools",
    subcategory: "Hand Drills",
    brand: "Dormer",
    publishedDate: "2023-10-15"
  };
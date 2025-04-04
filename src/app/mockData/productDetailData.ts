import { Product } from '../types/category.types';
import { 
  ProductDetail, 
  ProductSpecification, 
  ProductAvailability,
  ProductRange 
} from '../types/product.type';
import { allProducts } from './productData';

/**
 * Generates a list of specifications based on the product details
 */
const generateSpecifications = (product: Product): ProductSpecification[] => {
  // Generate specifications based on product category and characteristics
  const specifications: ProductSpecification[] = [];
  
  // Common specifications
  specifications.push({ label: "Weight", value: `${(Math.random() * 2 + 0.02).toFixed(3)} kg` });
  
  const category = product.category || 'uncategorized';
  const subcategory = product.subcategory || 'general';
  
  if (category === 'industrial-tools') {
    if (subcategory === 'Power Tools') {
      specifications.push({ label: "Power", value: `${Math.floor(Math.random() * 1500 + 500)}W` });
      specifications.push({ label: "Voltage", value: "220-240V" });
      specifications.push({ label: "Speed", value: `${Math.floor(Math.random() * 3000 + 1000)} RPM` });
      specifications.push({ label: "Material", value: "Steel/Aluminum" });
      specifications.push({ label: "Dimensions", value: `${Math.floor(Math.random() * 30 + 20)} x ${Math.floor(Math.random() * 20 + 10)} x ${Math.floor(Math.random() * 10 + 5)} cm` });
    } else if (subcategory === 'Hand Tools') {
      specifications.push({ label: "Length", value: `${Math.floor(Math.random() * 30 + 15)} cm` });
      specifications.push({ label: "Material", value: "Chrome Vanadium Steel" });
      specifications.push({ label: "Finish", value: "Chrome-plated" });
      specifications.push({ label: "Grip Type", value: "Ergonomic Rubber" });
    } else if (subcategory === 'Measuring Instruments') {
      specifications.push({ label: "Accuracy", value: `±${(Math.random() * 0.1).toFixed(3)} mm` });
      specifications.push({ label: "Range", value: `0-${Math.floor(Math.random() * 100 + 50)} m` });
      specifications.push({ label: "Display", value: "Digital LCD" });
      specifications.push({ label: "Power Source", value: "2x AAA Batteries" });
    } else if (subcategory === 'Safety Equipment') {
      specifications.push({ label: "Material", value: "High-impact ABS" });
      specifications.push({ label: "Certification", value: "EN 397" });
      specifications.push({ label: "Features", value: "Face shield, ear protection" });
      specifications.push({ label: "Color", value: "Yellow" });
    }
  } else if (category === 'machining') {
    if (subcategory === 'Cutting Tools') {
      specifications.push({ label: "Diameter", value: `${(Math.random() * 10 + 1).toFixed(1)} mm` });
      specifications.push({ label: "Material", value: "Tungsten Carbide" });
      specifications.push({ label: "Flutes", value: `${Math.floor(Math.random() * 4 + 2)}` });
      specifications.push({ label: "Coating", value: "TiAlN" });
      specifications.push({ label: "Total Length", value: `${Math.floor(Math.random() * 50 + 40)} mm` });
      specifications.push({ label: "Cutting Length", value: `${Math.floor(Math.random() * 20 + 10)} mm` });
    } else if (subcategory === 'Measuring Instruments') {
      specifications.push({ label: "Range", value: `0-${Math.floor(Math.random() * 150 + 50)} mm` });
      specifications.push({ label: "Resolution", value: "0.01 mm" });
      specifications.push({ label: "Accuracy", value: `±${(Math.random() * 0.02).toFixed(3)} mm` });
      specifications.push({ label: "Material", value: "Stainless Steel" });
      specifications.push({ label: "Display", value: "LCD" });
    }
  } else if (category === 'welding') {
    specifications.push({ label: "Input Power", value: "220-240V, 50/60Hz" });
    specifications.push({ label: "Output Current", value: `${Math.floor(Math.random() * 200 + 20)}-${Math.floor(Math.random() * 200 + 200)}A` });
    specifications.push({ label: "Duty Cycle", value: `${Math.floor(Math.random() * 30 + 60)}% @ ${Math.floor(Math.random() * 100 + 100)}A` });
    specifications.push({ label: "Welding Thickness", value: `${(Math.random() * 10 + 0.5).toFixed(1)} mm` });
    specifications.push({ label: "Dimensions", value: `${Math.floor(Math.random() * 30 + 40)} x ${Math.floor(Math.random() * 20 + 20)} x ${Math.floor(Math.random() * 20 + 30)} cm` });
  } else {
    // Add generic specifications for unknown categories
    specifications.push({ label: "Material", value: "Composite" });
    specifications.push({ label: "Dimensions", value: `${Math.floor(Math.random() * 20 + 10)} x ${Math.floor(Math.random() * 15 + 5)} x ${Math.floor(Math.random() * 5 + 2)} cm` });
  }
  
  return specifications;
};

/**
 * Generates mock availability data for a product
 */
const generateAvailability = (product: Product): ProductAvailability[] => {
  const suppliers = [
    { name: "Orexad", countryCode: "FR" },
    { name: "Biesheuvel", countryCode: "NL" },
    { name: "Zitec", countryCode: "DE" },
  ];
  
  // Select 1-3 random suppliers
  const numSuppliers = Math.floor(Math.random() * 3) + 1;
  const selectedSuppliers: ProductAvailability[] = [];
  
  for (let i = 0; i < numSuppliers; i++) {
    const randomIndex = Math.floor(Math.random() * suppliers.length);
    selectedSuppliers.push({
      supplier: suppliers[randomIndex].name,
      erpReference: product.erpReference || `${suppliers[randomIndex].countryCode}-${Math.floor(Math.random() * 9000000 + 1000000)}`,
      countryCode: suppliers[randomIndex].countryCode
    });
    suppliers.splice(randomIndex, 1); // Remove selected supplier to avoid duplicates
  }
  
  return selectedSuppliers;
};

/**
 * Generates a product range (similar products) for a product
 */
const generateProductRange = (product: Product): ProductRange => {
  // Base the range ID on the product reference
  const safeReference = product.reference || `REF-${Math.floor(Math.random() * 9000 + 1000)}`;
  const baseRef = safeReference.split('-')[0];
  const rangeId = `${baseRef}-series`;
  
  // Generate 2-4 variations
  const numVariations = Math.floor(Math.random() * 3) + 2;
  const specs = generateSpecifications(product);
  
  // Convert array specifications to object
  const baseSpecs: Record<string, string> = {};
  specs.forEach(spec => {
    baseSpecs[spec.label] = spec.value;
  });
  
  const products = [];
  
  // Add the current product to the range
  products.push({
    id: safeReference,
    euRef: `G${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
    name: `${product.title || 'Product'} ${safeReference}`,
    image: product.image || '/placeholder.png',
    specifications: { ...baseSpecs }
  });
  
  // Generate variations
  for (let i = 1; i <= numVariations; i++) {
    const id = `${baseRef}-${Math.floor(Math.random() * 900 + 100)}`;
    const euRef = `G${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
    
    // Vary some specifications slightly
    const modifiedSpecs = { ...baseSpecs };
    
    // Modify some values for variation
    Object.keys(modifiedSpecs).forEach(key => {
      if (key === "Diameter") {
        const currentValue = parseFloat(modifiedSpecs[key]);
        modifiedSpecs[key] = `${(currentValue + Math.random() * 2).toFixed(1)} mm`;
      } else if (key === "Weight") {
        const currentValue = parseFloat(modifiedSpecs[key]);
        modifiedSpecs[key] = `${(currentValue + Math.random() * 0.5).toFixed(3)} kg`;
      } else if (key === "Length" || key === "Total Length" || key === "Cutting Length") {
        // Extract numeric part and unit
        const match = modifiedSpecs[key].match(/(\d+(?:\.\d+)?)\s*(.+)/);
        if (match) {
          const value = parseFloat(match[1]);
          const unit = match[2];
          modifiedSpecs[key] = `${Math.floor(value + Math.random() * 10)} ${unit}`;
        }
      }
    });
    
    products.push({
      id,
      euRef,
      name: `${product.title || 'Product'} ${id}`,
      image: product.image || '/placeholder.png',
      specifications: modifiedSpecs
    });
  }
  
  return {
    rangeId,
    productCount: products.length,
    products
  };
};

/**
 * Returns a random enrichment level from the available options
 */
const getRandomEnrichmentLevel = (): string => {
  const levels = ["LIS", "BAS", "OPT", "EXC"];
  return levels[Math.floor(Math.random() * levels.length)];
};

/**
 * Transforms a basic product into the detailed format
 */
export const transformToDetailProduct = (product: Product): ProductDetail => {
  // Safety checks for all properties
  const safeProduct = {
    id: product.id || '',
    title: product.title || 'Unnamed Product',
    description: product.description || 'No description available',
    reference: product.reference || `REF-${Math.floor(Math.random() * 9000 + 1000)}`,
    erpReference: product.erpReference || '',
    ean: product.ean || `${Math.floor(Math.random() * 9000000000000) + 1000000000000}`,
    manufacturer: product.manufacturer || 'Unknown',
    image: product.image || '/placeholder.png',
    category: product.category || 'Uncategorized',
    subcategory: product.subcategory || 'General',
    enrichmentLevel: product.enrichmentLevel || 'BAS',
    availableLanguages: product.availableLanguages || ['en']
  };
  
  // REMOVED: Code that generates additional images
  
  // Generate a longer description
  const fullDescription = `${safeProduct.title} is a high-quality ${safeProduct.subcategory.toLowerCase()} designed for professional use. 
    Manufactured by ${safeProduct.manufacturer}, this tool offers superior performance and reliability in demanding conditions. 
    ${safeProduct.description} 
    Built with premium materials and precision engineering, it ensures consistent results and durability even in challenging environments. 
    Ideal for industrial applications, professional workshops, and specialized projects.`;
  
  // Ensure enrichment level is one of the accepted values, or assign randomly if not
  let enrichmentLevel = safeProduct.enrichmentLevel;
  if (!["LIS", "BAS", "OPT", "EXC"].includes(enrichmentLevel)) {
    enrichmentLevel = getRandomEnrichmentLevel();
  }
  
  // Create the transformed product
  return {
    name: safeProduct.title,
    description: safeProduct.description,
    fullDescription: fullDescription.replace(/\s+/g, ' ').trim(),
    
    reference: safeProduct.reference,
    euReference: `G${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
    ean: safeProduct.ean,
    mdmItemId: `MDM-${Math.floor(Math.random() * 1000000 + 1000000)}`,
    
    qualityVerified: Math.random() > 0.3, // 70% chance of being verified
    enrichmentLevel: enrichmentLevel, // Using the validated enrichment level
    availableLanguages: safeProduct.availableLanguages,
    
    // Use only the original image, not generated ones
    images: [safeProduct.image],
    
    specifications: generateSpecifications(product),
    availability: generateAvailability(product),
    productRange: generateProductRange(product),
    
    category: safeProduct.category,
    subcategory: safeProduct.subcategory,
    brand: safeProduct.manufacturer,
    publishedDate: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString().split('T')[0]
  };
};

/**
 * Get a detailed product by its ID or reference
 */
export const getProductDetailById = (productIdOrReference: string): ProductDetail | undefined => {
  // First try to find by ID (for backward compatibility)
  let product = allProducts.find(p => p.id === productIdOrReference);
  
  // If not found by ID, try to find by reference
  if (!product) {
    product = allProducts.find(p => p.reference === productIdOrReference);
  }
  
  if (!product) return undefined;
  
  return transformToDetailProduct(product);
};

/**
 * Get all products in detailed format
 */
export const getAllProductDetails = (): ProductDetail[] => {
  return allProducts.map(transformToDetailProduct);
};

// Example detailed product data that follows the target format directly
export const productDetailExample = {
  name: "Hand-reamers B952",
  description: "HSS cylindrical hand drill Dormer B9521.2",
  fullDescription: "Hand-reamers B952 is a high-quality HSS cylindrical hand drill designed for precision work. Made with durable materials, this Dormer B9521.2 tool offers excellent performance for extended periods. Suitable for both professional and DIY applications.",
  
  reference: "B9521.2",
  euReference: "G1086004946",
  ean: "7320760140901",
  mdmItemId: "1229277",
  
  qualityVerified: false,
  enrichmentLevel: "OPT",
  availableLanguages: ["fr", "en", "nl", "de", "es"],
  
  // Reduced to just one image
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
          "Material": "HSS+TiN",
          "Weight": "0.035 kg"
        }
      }
    ]
  },
  
  category: "Cutting Tools",
  subcategory: "Hand Drills",
  brand: "Dormer",
  publishedDate: "2023-10-15"
};
import { Product } from '../types/category.types';
export const allProducts: Product[] = [
  // Industrial Tools products (keep your existing products)
  {
    id: "t1",
    title: "Industrial Grade Drill Press",
    reference: "DRL-5500",
    erpReference: "C600-2214069",
    ean: "5901234123457",
    manufacturer: "PowerMaster",
    image: "/drill.png",
    category: "industrial-tools",
    subcategory: "Power Tools",
    description: "Heavy-duty drill press with variable speed control and digital depth gauge.",
    enrichmentLevel: "Premium",
    availableLanguages: ["en", "fr", "de", "es"]
  },
  {
    id: "t2",
    title: "Professional Torque Wrench Set",
    reference: "TWS-220",
    erpReference: "B400-3365128",
    ean: "5901234123458",
    manufacturer: "PrecisionPro",
    image:  "/Torque.png",
    category: "industrial-tools",
    subcategory: "Hand Tools",
    description: "High-precision torque wrench set with digital display and calibration certificate.",
    enrichmentLevel: "Premium",
    availableLanguages: ["en", "fr", "de"]
  },
  {
    id: "t3",
    title: "Laser Distance Meter",
    reference: "LDM-150",
    erpReference: "M200-1124567",
    ean: "5901234123459",
    manufacturer: "MeasureMax",
    image:  "/LaserDistanceMeter.png",
    category: "industrial-tools",
    subcategory: "Measuring Instruments",
    description: "Advanced laser distance meter with 150m range and Bluetooth connectivity.",
    enrichmentLevel: "Standard",
    availableLanguages: ["en", "fr"]
  },
  {
    id: "t4",
    title: "Industrial Safety Helmet",
    reference: "SH-2000",
    erpReference: "S300-9987654",
    ean: "5901234123460",
    manufacturer: "SafeGuard",
    image: "/helmet.png",
    category: "industrial-tools",
    subcategory: "Safety Equipment",
    description: "Impact-resistant safety helmet with integrated face shield and ear protection.",
    enrichmentLevel: "Basic",
    availableLanguages: ["en"]
  },
  {
    id: "t5",
    title: "Professional MIG Welder",
    reference: "WLD-3500",
    erpReference: "W500-8876543",
    ean: "5901234123461",
    manufacturer: "WeldTech",
    image: "/welder.png",
    category: "industrial-tools",
    subcategory: "Welding",
    description: "Professional-grade MIG welder with digital controls and gas/gasless capability.",
    enrichmentLevel: "LIS",
    availableLanguages: ["en", "fr", "de", "es", "it"]
  },
  {
    id: "t6",
    title: "Cordless Impact Wrench",
    reference: "IW-1200",
    erpReference: "C600-7766554",
    ean: "5901234123462",
    manufacturer: "PowerMaster",
    image: "/CordlessImpactWrench.png",
    category: "industrial-tools",
    subcategory: "Power Tools",
    description: "Heavy-duty cordless impact wrench with 1200Nm torque and brushless motor.",
    enrichmentLevel: "Standard",
    availableLanguages: ["en", "fr"]
  },
  
  // Add products for other categories
  
  // Machining category products
  {
    id: "m1",
    title: "CNC Carbide End Mill",
    reference: "EM-2204",
    erpReference: "M100-3456789",
    ean: "5901234123500",
    manufacturer: "PrecisionTools",
    image: "/endmill.png",
    category: "machining",
    subcategory: "Cutting Tools",
    description: "High-performance carbide end mill for precision machining applications.",
    enrichmentLevel: "Premium",
    availableLanguages: ["en", "fr", "de"]
  },
  {
    id: "m2",
    title: "Digital Caliper",
    reference: "DC-150",
    erpReference: "M200-4567890",
    ean: "5901234123501",
    manufacturer: "MeasureMax",
    image: "/caliper.png",
    category: "machining",
    subcategory: "Measuring Instruments",
    description: "Precision digital caliper with 0.01mm accuracy and digital display.",
    enrichmentLevel: "Standard",
    availableLanguages: ["en", "fr"]
  },
  
  // Welding category products
  {
    id: "w1",
    title: "TIG Welding Machine",
    reference: "TIG-2000",
    erpReference: "W100-5678901",
    ean: "5901234123600",
    manufacturer: "WeldTech",
    image: "/tig-welder.png",
    category: "welding",
    subcategory: "Welding Machines",
    description: "Professional TIG welding machine with digital controls and pulse function.",
    enrichmentLevel: "Premium",
    availableLanguages: ["en", "fr", "de", "es"]
  }
  // Add more products for different categories as needed
];

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return allProducts.filter(product => product.category === categoryId);
};
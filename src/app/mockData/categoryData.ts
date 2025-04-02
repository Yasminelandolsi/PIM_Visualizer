import { Category, Product, FilterOptions } from '../types/category.types';

// Complete categories structure that can be used for navigation
export const allCategories: Category[] = [
  {
    id: "mechanical-transmission",
    name: "Mechanical Transmission", 
    description: "Components for mechanical power transmission systems",
    subcategories: ["Gears & Gearboxes", "Bearings & Bushings", "Chains & Sprockets"]
  },
  {
    id: "machining",
    name: "Machining", 
    description: "Tools and equipment for professional machining operations",
    subcategories: ["Cutting Tools", "Machine Accessories", "CNC Components"]
  },
  {
    id: "fluid-transmission",
    name: "Fluid Transmission & Flow Technology", 
    description: "Components for fluid handling and hydraulic systems",
    subcategories: ["Pumps & Valves", "Hoses & Fittings", "Hydraulic Systems"]
  },
  {
    id: "protection-safety",
    name: "Protection-Safety-Hygiene", 
    description: "Equipment for workplace safety and protection",
    subcategories: ["PPE", "Machine Guards", "Spill Control"]
  },
  {
    id: "tools-metrology",
    name: "Tools & Metrology", 
    description: "Precision tools and measuring instruments",
    subcategories: ["Hand Tools", "Measuring Instruments", "Calibration Equipment"]
  },
  {
    id: "industrial-tools",
    name: "Industrial Tools", 
    description: "Professional tools for industrial applications",
    subcategories: ["Power Tools", "Hand Tools", "Measuring Instruments", "Safety Equipment", "Welding"]
  },
  {
    id: "maintenance-repairs",
    name: "Maintenance & Repairs", 
    description: "Products for industrial maintenance and repair operations",
    subcategories: ["Lubricants", "Repair Kits", "Diagnostic Tools"]
  },
  {
    id: "welding",
    name: "Welding", 
    description: "Equipment and supplies for professional welding",
    subcategories: ["Welding Machines", "Consumables", "Safety Gear"]
  },
  {
    id: "installation-assembly",
    name: "Installation & Assembly", 
    description: "Products for assembly and installation tasks",
    subcategories: ["Fasteners", "Adhesives", "Mounting Systems"]
  },
  {
    id: "equipment",
    name: "Equipment", 
    description: "Industrial equipment and machinery",
    subcategories: ["Heavy Machinery", "Power Tools", "Material Handling"]
  }
];

// Get a specific category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return allCategories.find(category => category.id === id);
};

// Sample products only for the Industrial Tools category
export const sampleProducts: Product[] = [
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
  }
];

// Helper function to generate menu items from categories for the header
export const generateNavigationMenuItems = () => {
  return allCategories.map(category => ({
    label: category.name.toUpperCase(),
    id: category.id,
    href: `/category/${category.id}`,
    subItems: [
      { 
        label: `All ${category.name}`, 
        href: `/category/${category.id}`,
        id: "all" 
      },
      ...category.subcategories.map(subcategory => ({
        label: subcategory,
        href: `/category/${category.id}?subcategory=${encodeURIComponent(subcategory)}`,
        id: subcategory.toLowerCase().replace(/\s+/g, '-')
      }))
    ]
  }));
};

// Helper function to extract filter options from products
export const getFilterOptions = (products: Product[]): FilterOptions => {
  return {
    subcategories: [...new Set(products.map(p => p.subcategory || '').filter(Boolean))],
    manufacturers: [...new Set(products.map(p => p.manufacturer))],
    erpReferences: [...new Set(products.map(p => p.erpReference))],
    languages: [...new Set(products.flatMap(p => p.availableLanguages || []))],
    enrichmentLevels: [...new Set(products.map(p => p.enrichmentLevel || '').filter(Boolean))]
  };
};

// For backwards compatibility (if any component still uses this)
export const categoryData = getCategoryById('industrial-tools') || {
  name: "Industrial Tools",
  description: "Professional tools for industrial applications",
  subcategories: ["Power Tools", "Hand Tools", "Measuring Instruments", "Safety Equipment", "Welding"]
};
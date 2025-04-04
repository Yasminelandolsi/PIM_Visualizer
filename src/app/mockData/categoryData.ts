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



// Helper function to generate menu items from categories for the header
export const generateNavigationMenuItems = (categories: Category[] = allCategories) => {
    return categories.map(category => ({
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

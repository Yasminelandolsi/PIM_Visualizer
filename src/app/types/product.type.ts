export interface ProductSpecification {
    label: string;
    value: string;
  }
  
  export interface ProductAvailability {
    supplier: string;
    erpReference: string;
    countryCode: string;
  }
  
  export interface ProductRangeItem {
    id: string;
    euRef: string;
    name: string;
    image: string;
    specifications: Record<string, string>;
  }
  
  export interface ProductRange {
    rangeId: string;
    productCount: number;
    products: ProductRangeItem[];
  }
  
  export interface ProductDetail {
    name: string;
    description: string;
    fullDescription: string;
    
    reference: string;
    euReference: string;
    ean: string;
    mdmItemId: string;
    
    qualityVerified: boolean;
    enrichmentLevel: string;
    availableLanguages: string[];
    
    images: string[];
    
    specifications: ProductSpecification[];
    availability: ProductAvailability[];
    productRange?: ProductRange;
    
    category: string;
    subcategory: string;
    brand: string;
    publishedDate: string;
  }
export interface Category {
  name: string;
  description: string;
  subcategories?: string[];
}

export interface Product {
  id: string;
  title: string;
  reference: string;
  erpReference: string;
  ean: string;
  manufacturer: string;
  image: string;
  category: string;
  subcategory?: string;
  description?: string;
  enrichmentLevel?: 'Basic' | 'Standard' | 'Premium' | 'LIS';
  availableLanguages?: string[];
  rating?: number;
}

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface RatingOption {
  id: string;
  label: string;
  value: number;
}

export interface FilterOptions {
  subcategories: string[];
  manufacturers: string[];
  erpReferences: string[];
  languages: string[];
  enrichmentLevels: string[];
}
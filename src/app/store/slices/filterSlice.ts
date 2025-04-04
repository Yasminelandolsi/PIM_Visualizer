import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductsByCategory} from './productSlice';
import { getFilterOptions } from '../../mockData/categoryData';

interface FilterState {
  subcategoryFilter: string[];
  manufacturerFilter: string[];
  erpReferenceFilter: string | null;
  languageFilter: string | null;
  enrichmentFilter: string | null;
  filterOptions: {
    subcategories: string[];
    manufacturers: string[];
    erpReferences: string[];
    languages: string[];
    enrichmentLevels: string[];
  };
  sortBy: string;
  viewMode: 'grid' | 'list';
}

const initialState: FilterState = {
  subcategoryFilter: [],
  manufacturerFilter: [],
  erpReferenceFilter: null,
  languageFilter: null,
  enrichmentFilter: null,
  filterOptions: {
    subcategories: [],
    manufacturers: [],
    erpReferences: [],
    languages: [],
    enrichmentLevels: []
  },
  sortBy: 'featured',
  viewMode: 'grid'
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleSubcategoryFilter: (state, action: PayloadAction<string>) => {
      const subcategory = action.payload;
      if (state.subcategoryFilter.includes(subcategory)) {
        state.subcategoryFilter = state.subcategoryFilter.filter(sc => sc !== subcategory);
      } else {
        state.subcategoryFilter.push(subcategory);
      }
    },
    setSubcategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.subcategoryFilter = action.payload;
    },
    toggleManufacturerFilter: (state, action: PayloadAction<string>) => {
      const manufacturer = action.payload;
      if (state.manufacturerFilter.includes(manufacturer)) {
        state.manufacturerFilter = state.manufacturerFilter.filter(m => m !== manufacturer);
      } else {
        state.manufacturerFilter.push(manufacturer);
      }
    },
    setErpReferenceFilter: (state, action: PayloadAction<string | null>) => {
      state.erpReferenceFilter = action.payload;
    },
    setLanguageFilter: (state, action: PayloadAction<string | null>) => {
      state.languageFilter = action.payload;
    },
    setEnrichmentFilter: (state, action: PayloadAction<string | null>) => {
      state.enrichmentFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.subcategoryFilter = [];
      state.manufacturerFilter = [];
      state.erpReferenceFilter = null;
      state.languageFilter = null;
      state.enrichmentFilter = null;
    }
  },
  extraReducers: (builder) => {
    // When products are loaded, update available filter options
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.filterOptions = getFilterOptions(action.payload);
      // Reset filters when changing categories
      state.subcategoryFilter = [];
      state.manufacturerFilter = [];
      state.erpReferenceFilter = null;
      state.languageFilter = null;
      state.enrichmentFilter = null;
    });
  }
});

export const { 
  toggleSubcategoryFilter,
  setSubcategoryFilter,
  toggleManufacturerFilter,
  setErpReferenceFilter,
  setLanguageFilter,
  setEnrichmentFilter,
  setSortBy,
  setViewMode,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
export interface RangeProduct {
    id: string;
    euRef: string;
    name: string;
    image: string;
    specifications: {
      [key: string]: string;
    };
  }
  
  export interface FilterState {
    [key: string]: string[];
  }
  
  export type SortDirection = 'asc' | 'desc';
  export type ViewMode = 'table' | 'cards';
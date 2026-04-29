export interface Product {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  category: string;
  description: string;
  unit: string;
  image: string;
  tags: string[];
  inStock: boolean;
  showwebsite: boolean;
}

export type LayoutMode = 'grid' | 'list';
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-az';
export type PageView = 'home' | 'about';

/**
 * Product-related TypeScript types.
 */



/** Full product model matching Firestore schema */
export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string; // Denormalized for display
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  material: string;
  color: string;
  weight: string;
  size: string;
  stock: number;
  images: string[];         // Array of download URLs
  imagePaths?: string[];    // Array of Storage paths (for deletion)
  video?: string;
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

/** Form data for creating/updating a product */
export interface ProductFormData {
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  material: string;
  color: string;
  weight: string;
  size: string;
  stock: number;
  video?: string;
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

/** Filter options for product queries */
export interface ProductFilter {
  categoryId?: string;
  featured?: boolean;
  published?: boolean;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'createdAt' | 'price' | 'name';
  sortDirection?: 'asc' | 'desc';
}

/** Minimal product data for cards/lists */
export type ProductCard = Pick<
  Product,
  'id' | 'name' | 'slug' | 'price' | 'salePrice' | 'images' | 'shortDescription' | 'categoryName'
>;
